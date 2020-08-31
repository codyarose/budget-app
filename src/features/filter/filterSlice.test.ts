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

		expect(nextState).toEqual(result)
	})

	it('should create set start date action object', () => {
		const nextState = setStartDate(moment(0))

		const result = {
			type: setStartDate.type,
			payload: moment(0),
		}

		expect(nextState).toEqual(result)
	})

	it('should create end start date action object', () => {
		const nextState = setEndDate(moment(0))

		const result = {
			type: setEndDate.type,
			payload: moment(0),
		}

		expect(nextState).toEqual(result)
	})

	it('should create sort by date action object', () => {
		const nextState = sortByDate()

		const result = { type: sortByDate.type }

		expect(nextState).toEqual(result)
	})

	it('should create sort by amount action object', () => {
		const nextState = sortByAmount()

		const result = { type: sortByAmount.type }

		expect(nextState).toEqual(result)
	})

	it('should create set text filter action object with default value', () => {
		const nextState = setTextFilter('')

		const result = {
			type: setTextFilter.type,
			payload: '',
		}
		expect(nextState).toEqual(result)
	})

	it('should create set text filter action object with provided value', () => {
		const text = 'rent'

		const nextState = setTextFilter(text)

		const result = {
			type: setTextFilter.type,
			payload: text,
		}
		expect(nextState).toEqual(result)
	})
})
