import React from 'react'
import { shallow } from 'enzyme'
import Dashboard from './index'

describe('Dashboard component', () => {
	it('should render correctly', () => {
		const wrapper = shallow(<Dashboard />)

		expect(wrapper).toMatchSnapshot()
	})
})
