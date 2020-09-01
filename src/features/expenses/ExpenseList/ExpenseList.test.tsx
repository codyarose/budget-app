import React from 'react'
import { shallow } from 'enzyme'

import ExpenseList from './index'
import { selectVisibleExpenses } from '../expensesSlice'
import expenses from '../fixtures'

jest.mock('react-redux', () => ({
	useSelector: jest.fn((fn) => fn()),
}))
jest.mock('../expensesSlice')

describe('ExpenseList component', () => {
	it('should render with expenses', () => {
		;(selectVisibleExpenses as jest.Mock).mockReturnValue(expenses)

		const wrapper = shallow(<ExpenseList />)

		expect(wrapper).toMatchSnapshot()
	})

	it('show render with empty message', () => {
		;(selectVisibleExpenses as jest.Mock).mockReturnValue([])

		const wrapper = shallow(<ExpenseList />)

		expect(wrapper).toMatchSnapshot()
	})
})
