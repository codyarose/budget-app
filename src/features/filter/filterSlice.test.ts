import filter, {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate,
	initialState,
} from './filterSlice'
import moment from 'moment'

describe('filter reducer', () => {
	it('should handle initial state', () => {
		const nextState = initialState
		const result = filter(undefined, { type: undefined })
		expect(result).toEqual(nextState)
	})

	it('should create set start date action object', () => {
		expect(setStartDate(moment(0))).toEqual({
			type: setStartDate.type,
			payload: moment(0),
		})
	})

	it('should create end start date action object', () => {
		expect(setEndDate(moment(0))).toEqual({
			type: setEndDate.type,
			payload: moment(0),
		})
	})

	it('should create sort by date action object', () => {
		expect(sortByDate()).toEqual({ type: sortByDate.type })
	})

	it('should create sort by amount action object', () => {
		expect(sortByAmount()).toEqual({ type: sortByAmount.type })
	})

	it('should create set text filter action object with default value', () => {
		expect(setTextFilter('')).toEqual({
			type: setTextFilter.type,
			payload: '',
		})
	})

	it('should create set text filter action object with provided value', () => {
		const text = 'rent'
		expect(setTextFilter(text)).toEqual({
			type: setTextFilter.type,
			payload: text,
		})
	})
})
