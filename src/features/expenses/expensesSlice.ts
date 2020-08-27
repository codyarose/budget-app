import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

import { RootState } from '../../app/store'

export interface Expense {
	id: string
	description: string
	note: string
	amount: number
	createdAt: number
}

const initialState: Expense[] = []

export const expensesSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {
		addExpense: (state, action: PayloadAction<Partial<Expense>>) => {
			const {
				description = '',
				note = '',
				amount = 0,
				createdAt = 0,
			} = action.payload
			state.push({
				id: uuid(),
				description,
				note,
				amount,
				createdAt,
			})
		},
		removeExpense: (state, action: PayloadAction<string>) => {
			const id = action.payload
			const index = state.findIndex((expense) => expense.id === id)
			state.splice(index, 1)
		},
		editExpense: (state, action) => {
			const { id, updates } = action.payload
			const updatedExpenses = state.map((expense) => {
				if (expense.id === id) {
					return {
						...expense,
						...updates,
					}
				} else {
					return expense
				}
			})
			state = updatedExpenses
		},
	},
})

export const { addExpense, removeExpense, editExpense } = expensesSlice.actions

export const selectExpenses = (state: RootState): Expense[] => state.expenses

export const selectVisibleExpenses = (state: RootState): Expense[] => {
	const expenses = state.expenses
	const { startDate, endDate, text, sortBy } = state.filter

	return expenses
		.filter((expense) => {
			const startDateMatch =
				typeof startDate !== 'number' || expense.createdAt >= startDate
			const endDateMatch =
				typeof endDate !== 'number' || expense.createdAt <= endDate
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

export default expensesSlice.reducer
