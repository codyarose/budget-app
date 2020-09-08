import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import * as redux from 'react-redux'

import LoginPage from './index'
import { loginUser } from '../../features/auth/authSlice'

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
}))
jest.mock('../../features/auth/authSlice', () => ({
	loginUser: jest.fn(),
}))

const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
const mockDispatchFn = jest.fn()
useDispatchSpy.mockReturnValue(mockDispatchFn)

let wrapper: ShallowWrapper
beforeEach(() => {
	wrapper = shallow(<LoginPage />)
})

describe('LoginPage', () => {
	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should call loginUser on button click', () => {
		wrapper.find('button').simulate('click')

		expect(loginUser).toHaveBeenCalled()
	})
})
