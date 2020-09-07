jest.mock('uuid')
import { v4 } from 'uuid'
import thunk from 'redux-thunk'

import configureMockStore from 'redux-mock-store'

const mockedUuid = v4 as jest.Mocked<typeof v4>

import expenses, {
	initialState,
	addExpense,
	editExpense,
	removeExpense,
	selectExpenses,
	ExpenseData,
} from './expensesSlice'
import { initialState as initialFilterState } from '../filter/filterSlice'
import db from '../../firebase/firebase'
import mockExpenses from './fixtures'

const mockStore = configureMockStore([thunk])

beforeEach(async () => {
	const expensesData: { [key: string]: ExpenseData } = {}
	mockExpenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt }
	})
	await db.ref('expenses').set(expensesData)
})

describe('expenses reducer', () => {
	const mockData = [
		{
			id: '123abc',
			description: 'Title',
			note: '',
			amount: 140500,
			createdAt: 1598763926001,
		},
		{
			id: '456def',
			description: 'Blah',
			note: 'This is a note',
			amount: 2650,
			createdAt: 1598763926009,
		},
		{
			id: '789ghi',
			description: 'Another one',
			note: 'Text goes here',
			amount: 340098,
			createdAt: 1598763926345,
		},
	]

	it('should handle initial state', () => {
		const nextState = expenses(undefined, { type: '@@INIT' })

		const result = initialState

		expect(nextState).toEqual(result)
	})

	it('should remove expense by id', () => {
		const nextState = expenses(mockData, removeExpense(mockData[1].id))

		const rootState = { expenses: nextState, filter: initialFilterState }
		expect(selectExpenses(rootState)).toEqual([mockData[0], mockData[2]])
	})

	it('should not remove expense if id not found', () => {
		const nextState = expenses(mockData, removeExpense('-1'))

		const rootState = { expenses: nextState, filter: initialFilterState }
		expect(selectExpenses(rootState)).toEqual(mockData)
	})

	it('should add expense', () => {
		const data = {
			id: mockedUuid(),
			description: 'New expense',
			note: 'a note',
			amount: 99930,
			createdAt: 1598763926666,
		}
		const action = { type: addExpense.fulfilled.type, payload: data }
		const nextState = expenses(mockData, action)

		const rootState = { expenses: nextState, filter: initialFilterState }
		expect(selectExpenses(rootState)).toEqual([...mockData, data])
	})

	it('should add expense to store and database', async () => {
		const data = {
			description: 'From test',
			note: 'note text',
			amount: 112233,
			createdAt: 1234567890,
		}
		const store = mockStore({})
		await store.dispatch<any>(addExpense(data))
		const actions = store.getActions()
		const snapshot = db
			.ref(`expenses/${actions[1].payload.id}`)
			.once('value')

		expect((await snapshot).val()).toEqual(data)
	})

	it('should edit an expense', () => {
		const data = {
			editedExpense: {
				description: 'New Blah',
				note: 'Changed note',
				amount: 666420,
				createdAt: 1598763926009,
			},
			id: mockData[1].id,
		}

		const nextState = expenses(mockData, editExpense(data))

		const newMockData = mockData.slice()
		newMockData[1] = {
			id: data.id,
			...data.editedExpense,
		}

		const rootState = { expenses: nextState, filter: initialFilterState }
		expect(selectExpenses(rootState)).toEqual(newMockData)
	})

	it('should not edit expense if expense not found', () => {
		const data = {
			editedExpense: {
				amount: 10,
			},
			id: 'invalid id',
		}

		const nextState = expenses(mockData, editExpense(data))

		const rootState = { expenses: nextState, filter: initialFilterState }
		expect(selectExpenses(rootState)).toEqual(mockData)
	})
})
