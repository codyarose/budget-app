import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Moment } from 'moment'

import { RootState } from '../../app/store'
import moment from 'moment'
import db from '../../firebase/firebase'

export interface Expense {
	id: string
	description: string
	note: string
	amount: number
	createdAt: Moment | number
	user: string
}

export type ExpenseData = Omit<Expense, 'id' | 'user'>

export const initialState: Expense[] = []

const authUser = localStorage.getItem('authUser')
const uid: string = authUser && JSON.parse(authUser).uid

export const addExpense = createAsyncThunk<Expense, ExpenseData>(
	'expenses/addExpense',
	async (expenseData, { rejectWithValue }) => {
		try {
			const {
				description = '',
				note = '',
				amount = 0,
				createdAt = 0,
			} = expenseData
			const expense = { description, note, amount, createdAt, user: uid }

			const response = await db.ref('expenses').push(expense)

			return {
				id: response.key || '',
				...expense,
			}
		} catch (error) {
			return rejectWithValue(error)
		}
	},
)

export const setExpenses = createAsyncThunk(
	'expenses/setExpenses',
	async (uid: string, { rejectWithValue }) => {
		try {
			const expenses: Expense[] = []
			await db
				.ref('expenses')
				.orderByChild('user')
				.equalTo(uid)
				.once('value', (snapshot) => {
					snapshot.forEach((data) => {
						expenses.push({
							id: data.key,
							...data.val(),
						})
					})
				})
			return expenses
		} catch (error) {
			rejectWithValue(error)
		}
	},
)

export const removeExpense = createAsyncThunk(
	'expenses/removeExpense',
	async (id: string, { rejectWithValue }) => {
		try {
			await db.ref(`expenses/${id}`).remove()
			return id
		} catch (error) {
			rejectWithValue(error)
		}
	},
)

export const editExpense = createAsyncThunk(
	'expenses/editExpense',
	async (
		{
			editedExpense,
			id,
		}: { editedExpense: Partial<ExpenseData>; id: string },
		{ rejectWithValue },
	) => {
		try {
			const docRef = db.ref(`expenses/${id}`)
			const snapshot = await docRef.once('value')
			if (snapshot.exists()) {
				await docRef.set({
					...editedExpense,
				})
				return { editedExpense, id }
			}
		} catch (error) {
			rejectWithValue(error)
		}
	},
)

export const expensesSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addExpense.fulfilled, (state, action) => {
			state.push(action.payload)
		})
		builder.addCase(setExpenses.fulfilled, (_state, action) => {
			return action.payload
		})
		builder.addCase(removeExpense.fulfilled, (state, action) => {
			const id = action.payload
			const index = state.findIndex((expense) => expense.id === id)
			if (index === -1) {
				return state
			} else {
				state.splice(index, 1)
			}
		})
		builder.addCase(editExpense.fulfilled, (state, action) => {
			const id = action.payload?.id
			const index = state.findIndex((expense) => expense.id === id)
			state[index] = {
				...state[index],
				...action.payload?.editedExpense,
			}
		})
	},
})

export const selectExpenses = (state: RootState): Expense[] => state.expenses

export const selectVisibleExpenses = (state: RootState): Expense[] => {
	const expenses = state.expenses
	const { startDate, endDate, text, sortBy } = state.filter

	return expenses
		.filter((expense) => {
			const createdAtMoment = moment(expense.createdAt)
			const momentStartDate = moment(startDate)
			const momentEndDate = moment(endDate)

			const startDateMatch = startDate
				? momentStartDate.isSameOrBefore(createdAtMoment, 'day')
				: true
			const endDateMatch = endDate
				? momentEndDate.isSameOrAfter(createdAtMoment, 'day')
				: true
			const textMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase())

			return startDateMatch && endDateMatch && textMatch
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? 1 : -1
			} else if (sortBy === 'amount') {
				return a.amount < b.amount ? 1 : -1
			} else {
				return 1
			}
		})
}

export const selectTotal = (state: RootState): number => {
	const expenses = selectVisibleExpenses(state)

	if (!expenses.length) return 0

	return expenses.reduce((acc, expense) => {
		return acc + expense.amount
	}, 0)
}

export default expensesSlice.reducer
