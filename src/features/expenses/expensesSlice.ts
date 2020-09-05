import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { Moment } from 'moment'

import { RootState } from '../../app/store'
import moment from 'moment'

export interface Expense {
	id: string
	description: string
	note: string
	amount: number
	createdAt: Moment | number
}

export type ExpenseData = Omit<Expense, 'id'>

export const initialState: Expense[] = []

export const expensesSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {
		addExpense: (state, action: PayloadAction<Partial<ExpenseData>>) => {
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
			if (index === -1) {
				return state
			} else {
				state.splice(index, 1)
			}
		},
		editExpense: (
			state,
			action: PayloadAction<{
				editedExpense: Partial<ExpenseData>
				id: string
			}>,
		) => {
			const { editedExpense, id } = action.payload
			return state.map((expense) => {
				if (expense.id === id) {
					return {
						...expense,
						...editedExpense,
					}
				} else {
					return expense
				}
			})
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
