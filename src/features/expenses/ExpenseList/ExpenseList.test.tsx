import React from 'react'
import { shallow } from 'enzyme'

import ExpenseList from './index'
import expenses from '../fixtures'

describe('ExpenseList component', () => {
	it('should render with expenses', () => {
		const wrapper = shallow(<ExpenseList expenses={expenses} />)

		expect(wrapper).toMatchSnapshot()
	})

	it('show render with empty message', () => {
		const wrapper = shallow(<ExpenseList expenses={[]} />)

		expect(wrapper).toMatchSnapshot()
	})
})
