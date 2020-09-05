import React from 'react'
import { shallow } from 'enzyme'

import Dashboard from './index'
import {
	selectVisibleExpenses,
	selectTotal,
} from '../../features/expenses/expensesSlice'
import expenses from '../../features/expenses/fixtures'

jest.mock('react-redux', () => ({
	useSelector: jest.fn((fn) => fn()),
}))
jest.mock('../../features/expenses/expensesSlice')

describe('Dashboard component', () => {
	it('should render correctly', () => {
		;(selectVisibleExpenses as jest.Mock).mockReturnValue(expenses)
		;(selectTotal as jest.Mock).mockReturnValue(483248)
		const wrapper = shallow(<Dashboard />)

		expect(wrapper).toMatchSnapshot()
	})
})
