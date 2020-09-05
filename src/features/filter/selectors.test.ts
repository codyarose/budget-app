import moment from 'moment'

import {
	selectFilters,
	selectText,
	selectSortBy,
	selectStartDate,
	selectEndDate,
} from './filterSlice'

describe('Selector', () => {
	const state = {
		expenses: [],
		filter: {
			text: 'test',
			sortBy: 'amount',
			startDate: moment().startOf('month').valueOf(),
			endDate: moment().endOf('month').valueOf(),
		},
	}

	describe('selectFilters', () => {
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

	it('selectText should return text state', () => {
		const nextState = selectText(state)

		expect(nextState).toEqual(state.filter.text)
	})

	it('selectSortBy should return sortBy state', () => {
		const nextState = selectSortBy(state)

		expect(nextState).toEqual(state.filter.sortBy)
	})

	it('selectStartDate should return startDate state', () => {
		const nextState = selectStartDate(state)

		expect(nextState).toEqual(state.filter.startDate)
	})

	it('selectEndDate should return endDate state', () => {
		const nextState = selectEndDate(state)

		expect(nextState).toEqual(state.filter.endDate)
	})
})
