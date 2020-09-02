import React from 'react'
import { shallow } from 'enzyme'

import ExpenseForm from './index'
import expenses from '../fixtures'
import Error from '../../../components/Error'

jest.mock('moment', () => {
	const moment = jest.requireActual('moment')
	const mockMoment = (timestamp = 0) => {
		return moment(timestamp)
	}
	return mockMoment
})

describe('ExpenseForm', () => {
	it('should render correctly', () => {
		const wrapper = shallow(
			<ExpenseForm onSubmit={(expense) => console.log(expense)} />,
		)

		expect(wrapper).toMatchSnapshot()
	})

	it('should render with expense data', () => {
		const wrapper = shallow(
			<ExpenseForm
				expense={expenses[2]}
				onSubmit={(expense) => console.log(expense)}
			/>,
		)

		expect(wrapper).toMatchSnapshot()
	})

	it('should render error for invalid form submission', () => {
		const wrapper = shallow(
			<ExpenseForm onSubmit={(expense) => console.log(expense)} />,
		)
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
		const wrapper = shallow(
			<ExpenseForm onSubmit={(expense) => console.log(expense)} />,
		)
		const value = 'new description'

		wrapper.find('#expenseDescription').simulate('change', {
			target: { name: 'description', value },
		})
		expect(wrapper.find('#expenseDescription').props().value).toEqual(value)
	})

	it('should set note on input change', () => {
		const wrapper = shallow(
			<ExpenseForm onSubmit={(expense) => console.log(expense)} />,
		)
		const value = 'new note'

		wrapper.find('#expenseNote').simulate('change', {
			target: { name: 'note', value },
		})
		expect(wrapper.find('#expenseNote').props().value).toEqual(value)
	})

	it('should set amount if valid input', () => {
		const wrapper = shallow(
			<ExpenseForm onSubmit={(expense) => console.log(expense)} />,
		)
		const value = '13.69'

		wrapper.find('#expenseAmount').simulate('change', {
			target: { value },
		})
		expect(wrapper.find('#expenseAmount').props().value).toEqual(value)
	})

	it('should not set amount if invalid input', () => {
		const wrapper = shallow(
			<ExpenseForm onSubmit={(expense) => console.log(expense)} />,
		)
		const value = '13.666'

		wrapper.find('#expenseAmount').simulate('change', {
			target: { value },
		})
		expect(wrapper.find('#expenseAmount').props().value).toEqual('')
	})
})
