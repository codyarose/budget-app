import moment from 'moment'

import {
	selectExpenses,
	selectVisibleExpenses,
	selectTotal,
	Expense,
} from './expensesSlice'
import {
	initialState as FilterInitialState,
	FilterState,
} from '../filter/filterSlice'

describe('expense selectors', () => {
	const expensesMockData = [
		{
			amount: 4500,
			id: '1',
			description: 'Internet',
			note: '',
			createdAt: moment(0).startOf('month').add(1, 'days').valueOf(),
		},
		{
			id: '2',
			description: 'Rent',
			note: '',
			amount: 147500,
			createdAt: moment(0).startOf('month').add(4, 'days').valueOf(),
		},
		{
			id: '3',
			description: 'Groceries',
			note: '',
			amount: 12300,
			createdAt: moment(0).endOf('month').subtract(10, 'days').valueOf(),
		},
	]

	let state: { expenses: Expense[]; filter: FilterState }
	beforeEach(() => {
		state = {
			expenses: expensesMockData,
			filter: {
				...FilterInitialState,
				startDate: moment(0).startOf('month').valueOf(),
				endDate: moment(0).endOf('month').valueOf(),
			},
		}
	})

	it('should return all current expenses', () => {
		expect(selectExpenses(state)).toEqual(expensesMockData)
	})

	it('should filter expenses by text value', () => {
		state.filter = {
			...state.filter,
			text: 'n',
		}
		expect(selectVisibleExpenses(state)).toEqual([
			expensesMockData[1],
			expensesMockData[0],
		])
	})

	it('should filter expenses by startDate', () => {
		state.filter = {
			...state.filter,
			startDate: moment(0).startOf('month').add(3, 'days').valueOf(),
		}

		expect(selectVisibleExpenses(state)).toEqual([
			expensesMockData[2],
			expensesMockData[1],
		])
	})

	it('should filter expenses by endDate', () => {
		state.filter = {
			...state.filter,
			endDate: moment(0).startOf('month').add(2, 'days').valueOf(),
		}
		expect(selectVisibleExpenses(state)).toEqual([expensesMockData[0]])
	})

	it('should filter expenses by date', () => {
		state.filter = { ...state.filter, sortBy: 'date' }
		expect(selectVisibleExpenses(state)).toEqual([
			expensesMockData[2],
			expensesMockData[1],
			expensesMockData[0],
		])
	})

	it('should filter expenses by amount', () => {
		state.filter = { ...state.filter, sortBy: 'amount' }

		expect(selectVisibleExpenses(state)).toEqual([
			expensesMockData[1],
			expensesMockData[2],
			expensesMockData[0],
		])
	})

	describe('selectTotal', () => {
		it('should return 0 if no expenses', () => {
			state.expenses = []
			expect(selectTotal(state)).toEqual(0)
		})

		it('should correctly add up a single expense', () => {
			const expense = expensesMockData[1]
			state.expenses = [expense]
			expect(selectTotal(state)).toEqual(expense.amount)
		})

		it('should correctly add up multiple expenses', () => {
			expect(selectTotal(state)).toEqual(164300)
		})
	})
})
