import React from 'react'
import { shallow } from 'enzyme'

import ExpenseForm from './index'
import expenses from '../fixtures'

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
})
