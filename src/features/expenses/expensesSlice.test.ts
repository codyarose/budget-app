jest.mock('uuid')
import { v4 } from 'uuid'
import thunk, { ThunkDispatch } from 'redux-thunk'

import configureMockStore from 'redux-mock-store'

const mockedUuid = v4 as jest.Mocked<typeof v4>

import expenses, {
	initialState,
	addExpense,
	editExpense,
	removeExpense,
	selectExpenses,
	setExpenses,
	Expense,
} from './expensesSlice'
import { initialState as initialFilterState } from '../filter/filterSlice'
import { initialState as initialAuthState } from '../auth/authSlice'
import db from '../../firebase/firebase'
import mockExpenses from './fixtures'
import { RootState } from '../../app/store'
import { AnyAction } from '@reduxjs/toolkit'

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>

const mockStore = configureMockStore<RootState, DispatchExts>([thunk])
const rootState = {
	expenses: initialState,
	filter: initialFilterState,
	auth: initialAuthState,
}

type MockExpense = Omit<Expense, 'id'>

beforeEach(async () => {
	const expensesData: { [key: string]: MockExpense } = {}
	mockExpenses.forEach(
		({ id, description, note, amount, createdAt, user }) => {
			expensesData[id] = { description, note, amount, createdAt, user }
		},
	)
	await db.ref('expenses').set(expensesData)
})

describe('expensesSlice', () => {
	it('should handle initial state', () => {
		const nextState = expenses(undefined, { type: '@@INIT' })

		const result = initialState

		expect(nextState).toEqual(result)
	})

	it('should remove expense by id from redux and firebase', async () => {
		const id = mockExpenses[1].id
		const store = mockStore(rootState)
		store.dispatch(removeExpense(id))
		const snapshot = await db.ref(`expenses/${id}`).once('value')
		expect(snapshot.val()).toBeFalsy()

		const action = { type: removeExpense.fulfilled.type, payload: id }
		const nextState = expenses(mockExpenses, action)
		rootState.expenses = nextState
		expect(selectExpenses(rootState)).toEqual([
			mockExpenses[0],
			mockExpenses[2],
		])
	})

	it('should not remove expense if id not found', () => {
		const id = 'invalidId'
		const action = { type: removeExpense.fulfilled.type, payload: id }
		const nextState = expenses(mockExpenses, action)

		rootState.expenses = nextState
		expect(selectExpenses(rootState)).toEqual(mockExpenses)
	})

	it('should add expense', () => {
		const data = {
			id: mockedUuid(),
			description: 'New expense',
			note: 'a note',
			amount: 99930,
			createdAt: 1598763926666,
			user: 'user1',
		}
		const action = { type: addExpense.fulfilled.type, payload: data }
		const nextState = expenses(mockExpenses, action)

		rootState.expenses = nextState
		expect(selectExpenses(rootState)).toEqual([...mockExpenses, data])
	})

	it('should add expense to store and database', async () => {
		const data = {
			description: 'From test',
			note: 'note text',
			amount: 112233,
			createdAt: 1234567890,
		}
		const store = mockStore(rootState)
		await store.dispatch(addExpense(data))
		const actions = store.getActions()
		const snapshot = db
			.ref(`expenses/${actions[1].payload.id}`)
			.once('value')

		expect((await snapshot).val()).toEqual(data)
	})

	it('should fetch expenses from firebase', async () => {
		const store = mockStore(rootState)
		await store.dispatch(setExpenses('user1'))
		const actions = store.getActions()

		expect(actions[1].payload).toEqual([mockExpenses[0], mockExpenses[2]])
	})

	it('should edit expense from firebase', async () => {
		const store = mockStore(rootState)
		const expense = mockExpenses[2]
		const updates = {
			description: 'Edited description',
			amount: 1122334455,
			note: 'Edited note',
		}
		await store.dispatch(
			editExpense({ editedExpense: updates, id: expense.id }),
		)
		const snapshot = db.ref(`expenses/${expense.id}`).once('value')

		expect((await snapshot).val()).toEqual(updates)
	})

	it('should not edit expense if expense not found', async () => {
		const store = mockStore(rootState)
		const updates = {
			amount: 1,
		}
		const id = 'invalidID'
		await store.dispatch(editExpense({ editedExpense: updates, id }))
		const snapshot = db.ref(`expenses/${id}`).once('value')

		expect((await snapshot).val()).toBeFalsy()
	})
})
