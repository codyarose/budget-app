import React from 'react'
import { shallow } from 'enzyme'

import ExpenseForm from './index'
import expenses from '../fixtures'
import Error from '../../../components/Error'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'

jest.mock('moment', () => {
	const moment = jest.requireActual('moment')
	const mockMoment = (timestamp = 0) => {
		return moment(timestamp)
	}
	return mockMoment
})

describe('ExpenseForm', () => {
	it('should render correctly', () => {
		const props = { onSubmit: jest.fn() }
		const wrapper = shallow(<ExpenseForm {...props} />)

		expect(wrapper).toMatchSnapshot()
	})

	it('should render with expense data', () => {
		const props = { onSubmit: jest.fn(), expense: expenses[2] }
		const wrapper = shallow(<ExpenseForm {...props} />)

		expect(wrapper).toMatchSnapshot()
	})

	it('should render error for invalid form submission', () => {
		const props = { onSubmit: jest.fn() }
		const wrapper = shallow(<ExpenseForm {...props} />)
		const form = wrapper.find('StyledForm')
		form.simulate('submit', {
			preventDefault: () => null,
		})

		expect(wrapper.find(Error).props().helperText).toBe(
			'Please provide description and amount.',
		)
		expect(wrapper).toMatchSnapshot()
	})

	it('should set description on input change', () => {
		const props = { onSubmit: jest.fn() }
		const wrapper = shallow(<ExpenseForm {...props} />)
		const value = 'new description'
		wrapper.find('#expenseDescription').simulate('change', {
			target: { name: 'description', value },
		})

		expect(wrapper.find('#expenseDescription').props().value).toEqual(value)
	})

	it('should set note on input change', () => {
		const props = { onSubmit: jest.fn() }

		const wrapper = shallow(<ExpenseForm {...props} />)
		const value = 'new note'

		wrapper.find('#expenseNote').simulate('change', {
			target: { name: 'note', value },
		})
		expect(wrapper.find('#expenseNote').props().value).toEqual(value)
	})

	it('should set amount if valid input', () => {
		const props = { onSubmit: jest.fn() }
		const wrapper = shallow(<ExpenseForm {...props} />)
		const value = '13.69'

		wrapper.find('#expenseAmount').simulate('change', {
			target: { value },
		})
		expect(wrapper.find('#expenseAmount').props().value).toEqual(value)
	})

	it('should not set amount if invalid input', () => {
		const props = { onSubmit: jest.fn() }
		const wrapper = shallow(<ExpenseForm {...props} />)
		const value = '13.666'

		wrapper.find('#expenseAmount').simulate('change', {
			target: { value },
		})
		expect(wrapper.find('#expenseAmount').props().value).toEqual('')
	})

	it('should call onSubmit prop for valid form submission', () => {
		const onSubmitSpy = jest.fn()
		const props = { onSubmit: onSubmitSpy, expense: expenses[2] }
		const wrapper = shallow(<ExpenseForm {...props} />)
		const values = { ...expenses[2] }
		delete values.id

		wrapper.find('StyledForm').simulate('submit', {
			preventDefault: () => null,
		})

		expect(wrapper.find(Error).props().helperText).toBe('')
		expect(onSubmitSpy).toHaveBeenLastCalledWith(values)
	})

	it('should set new date on date change', () => {
		const props = { onSubmit: jest.fn() }
		const wrapper = shallow(<ExpenseForm {...props} />)
		const now = moment()
		wrapper.find(SingleDatePicker).prop('onDateChange')(now)

		expect(wrapper.find(SingleDatePicker).prop('date')).toEqual(now)
	})

	it('should set calendar focus on change', () => {
		const props = { onSubmit: jest.fn() }
		const wrapper = shallow(<ExpenseForm {...props} />)
		const focused = true
		wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused })

		expect(wrapper.find(SingleDatePicker).prop('focused')).toEqual(focused)
	})
})
