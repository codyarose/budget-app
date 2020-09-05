import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import ExpenseTotal from '.'
import expenses from '../fixtures'

let props: { count: number; total: number }, wrapper: ShallowWrapper
beforeEach(() => {
	props = {
		count: 0,
		total: 0,
	}
	wrapper = shallow(<ExpenseTotal {...props} />)
})

describe('ExpenseTotal', () => {
	it('should not render if there are no expenses', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render correct cound and total with one expense', () => {
		const expense = [expenses[0]]

		wrapper.setProps({
			count: expense.length,
			total: expense[0].amount,
		})
		expect(wrapper).toMatchSnapshot()
	})

	it('should render correct cound and total with multiple expenses', () => {
		const total = expenses.reduce((acc, expense) => {
			return acc + expense.amount
		}, 0)

		wrapper.setProps({
			count: expenses.length,
			total,
		})
		expect(wrapper).toMatchSnapshot()
	})
})
