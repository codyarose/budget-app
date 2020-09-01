import filter, {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate,
	initialState,
	selectStartDate,
	selectEndDate,
	selectSortBy,
	selectText,
} from './filterSlice'
import moment from 'moment'

describe('filter reducer', () => {
	it('should handle initial state', () => {
		const nextState = filter(undefined, { type: '@@INIT' })

		const result = initialState

		expect(nextState).toEqual(result)
	})

	it('should set startDate filter', () => {
		const data = moment()

		const nextState = filter(initialState, setStartDate(data))

		const rootState = { expenses: [], filter: nextState }
		expect(selectStartDate(rootState)).toEqual(data)
	})

	it('should set endDate filter', () => {
		const data = moment(12345)

		const nextState = filter(initialState, setEndDate(data))

		const rootState = { expenses: [], filter: nextState }
		expect(selectEndDate(rootState)).toEqual(data)
	})

	it('should set sortBy to date', () => {
		const data = {
			...initialState,
			sortBy: 'amount',
		}

		const nextState = filter(data, sortByDate())

		const rootState = { expenses: [], filter: nextState }
		expect(selectSortBy(rootState)).toBe('date')
	})

	it('should set sortBy to amount', () => {
		const nextState = filter(initialState, sortByAmount())

		const rootState = { expenses: [], filter: nextState }
		expect(selectSortBy(rootState)).toBe('amount')
	})

	it('should set text filter', () => {
		const text = 'bananas'

		const nextState = filter(initialState, setTextFilter(text))

		const rootState = { expenses: [], filter: nextState }
		expect(selectText(rootState)).toBe(text)
	})
})
