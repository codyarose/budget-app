import React from 'react'
import { shallow } from 'enzyme'
import FourOhFourPage from './index'

describe('Dashboard component', () => {
	it('should render correctly', () => {
		const wrapper = shallow(<FourOhFourPage />)

		expect(wrapper).toMatchSnapshot()
	})
})
