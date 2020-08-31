import expenses, {
	initialState,
	addExpense,
	editExpense,
	removeExpense,
} from './expensesSlice'

describe('expenses reducer', () => {
	it('should handle initial state', () => {
		const nextState = initialState

		const result = expenses(undefined, { type: undefined })

		expect(result).toEqual(nextState)
	})

	it('should create action to add expense with provided values', () => {
		const expenseData = {
			description: 'Rent',
			note: 'This is a note',
			amount: 147500,
			createdAt: 1598763926001,
		}
		expect(addExpense(expenseData)).toEqual({
			type: addExpense.type,
			payload: { ...expenseData },
		})
	})

	it('should create action to add expense with default values', () => {
		const defaultData = {
			description: '',
			note: '',
			amount: 0,
			createdAt: 0,
		}

		expect(addExpense(defaultData)).toEqual({
			type: addExpense.type,
			payload: { ...defaultData },
		})
	})

	it('should create action to remove expense', () => {
		expect(removeExpense('123abc')).toEqual({
			type: removeExpense.type,
			payload: '123abc',
		})
	})

	it('should create action to edit expense', () => {
		const expenseData = {
			description: 'New description',
			note: '',
			amount: 123456,
			createdAt: 20383787,
		}

		expect(
			editExpense({
				id: '123abc',
				editedExpense: expenseData,
			}),
		).toEqual({
			type: editExpense.type,
			payload: {
				id: '123abc',
				editedExpense: { ...expenseData },
			},
		})
	})

	it('should handle removeExpense', () => {
		expect(
			expenses(
				[
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
				],
				{
					type: removeExpense.type,
					payload: '123abc',
				},
			),
		).toEqual([
			{
				id: '456def',
				description: 'Blah',
				note: 'This is a note',
				amount: 2650,
				createdAt: 1598763926009,
			},
		])
	})
})
