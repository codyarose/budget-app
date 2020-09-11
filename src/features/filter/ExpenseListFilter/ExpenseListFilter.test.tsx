import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import * as redux from 'react-redux'
import moment from 'moment'

import ExpenseListFilter from './index'
import {
	selectText,
	selectSortBy,
	selectStartDate,
	selectEndDate,
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate,
} from '../filterSlice'
import { filters, altFilters } from '../fixtures'
import { TextInput, SelectInput } from '../../../components/common/Inputs'
import { StyledDateRangePicker } from '../../../components/common/DatePickers'

jest.mock('moment', () => {
	const moment = jest.requireActual('moment')
	const mockMoment = (timestamp = 0) => {
		return moment(timestamp)
	}
	return mockMoment
})

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn((fn) => fn()),
}))

jest.mock('../filterSlice')

const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
const mockDispatchFn = jest.fn()
useDispatchSpy.mockReturnValue(mockDispatchFn)

let wrapper: ShallowWrapper
beforeEach(() => {
	wrapper = shallow(<ExpenseListFilter />)
})

describe('ExpenseListFilter', () => {
	it('should render correctly', () => {
		;(selectText as jest.Mock).mockReturnValue(filters.text)
		;(selectSortBy as jest.Mock).mockReturnValue(filters.sortBy)
		;(selectStartDate as jest.Mock).mockReturnValue(filters.startDate)
		;(selectEndDate as jest.Mock).mockReturnValue(filters.endDate)
		wrapper.setProps({})
		expect(wrapper).toMatchSnapshot()
	})

	it('should render with alt data correctly', () => {
		;(selectText as jest.Mock).mockReturnValueOnce(altFilters.text)
		;(selectSortBy as jest.Mock).mockReturnValueOnce(altFilters.sortBy)
		;(selectStartDate as jest.Mock).mockReturnValueOnce(
			altFilters.startDate,
		)
		;(selectEndDate as jest.Mock).mockReturnValueOnce(altFilters.endDate)
		wrapper.setProps({})
		expect(wrapper).toMatchSnapshot()
	})

	it('should handle text change', () => {
		const value = 'new text'

		wrapper.find(TextInput).simulate('change', { target: { value } })

		expect(setTextFilter).toHaveBeenLastCalledWith(value)
	})

	it('should handle sort by date', () => {
		const value = 'date'

		;(selectSortBy as jest.Mock).mockReturnValueOnce(altFilters.sortBy)
		wrapper.setProps({})
		expect(wrapper.find(SelectInput).at(0).prop('value')).toBe(
			altFilters.sortBy,
		)

		wrapper
			.find(SelectInput)
			.at(0)
			.simulate('change', { target: { value } })
		wrapper.setProps({})
		expect(wrapper.find(SelectInput).at(0).prop('value')).toBe(value)
		expect(sortByDate).toHaveBeenCalled()
	})

	it('should handle sort by amount', () => {
		const value = 'amount'

		wrapper
			.find(SelectInput)
			.at(0)
			.simulate('change', { target: { value } })

		expect(sortByAmount).toHaveBeenCalled()
	})

	it('should handle date changes', () => {
		const startDate = moment(0).add(6, 'days')
		const endDate = moment(0).add(12, 'days')

		wrapper.find(StyledDateRangePicker).prop('onDatesChange')({
			startDate,
			endDate,
		})

		expect(setStartDate).toHaveBeenLastCalledWith(startDate)
		expect(setEndDate).toHaveBeenLastCalledWith(endDate)
	})

	it('should handle date focus changes', () => {
		const value = 'endDate'

		wrapper.find(StyledDateRangePicker).prop('onFocusChange')(value)
		expect(wrapper.find(StyledDateRangePicker).prop('focusedInput')).toBe(
			value,
		)
	})
})
