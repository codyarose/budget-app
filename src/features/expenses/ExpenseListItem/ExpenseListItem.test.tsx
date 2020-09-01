import React from 'react'
import { shallow } from 'enzyme'

import ExpenseListItem from '.'
import expenses from '../fixtures'

describe('ExpenseListItem component', () => {
	it('should render correctly with expense data', () => {
		const wrapper = shallow(<ExpenseListItem {...expenses[1]} />)

		expect(wrapper).toMatchSnapshot()
	})
})
