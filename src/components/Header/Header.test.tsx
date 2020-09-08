import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import * as redux from 'react-redux'

import Header from './index'
import { logoutUser } from '../../features/auth/authSlice'

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
}))
jest.mock('../../features/auth/authSlice', () => ({
	logoutUser: jest.fn(),
}))

const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
const mockDispatchFn = jest.fn()
useDispatchSpy.mockReturnValue(mockDispatchFn)

let wrapper: ShallowWrapper
beforeEach(() => {
	wrapper = shallow(<Header />)
})

describe('Header component', () => {
	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should call logoutUser on button click', () => {
		wrapper.find('button').simulate('click')

		expect(logoutUser).toHaveBeenCalled()
	})
})
