import React from 'react'
import { shallow } from 'enzyme'
import Header from './index'

describe('Header component', () => {
	it('should render correctly', () => {
		const wrapper = shallow(<Header />)
		expect(wrapper).toMatchSnapshot()
	})
})
