import moment from 'moment'

import { selectFilters } from './filterSlice'

describe('', () => {
	const state = {
		expenses: [],
		filter: {
			text: 'test',
			sortBy: 'amount',
			startDate: moment().startOf('month').valueOf(),
			endDate: moment().endOf('month').valueOf(),
		},
	}

	it('should return the current filter state', () => {
		const nextState = selectFilters(state)

		expect(nextState).toEqual(state.filter)
	})

	it('should return the current filter state after changes', () => {
		state.filter = {
			text: 'different text',
			sortBy: 'date',
			startDate: moment(0).startOf('month').add(3, 'days').valueOf(),
			endDate: moment().endOf('month').subtract(1, 'day').valueOf(),
		}

		const nextState = selectFilters(state)

		expect(nextState).toEqual(state.filter)
	})
})
