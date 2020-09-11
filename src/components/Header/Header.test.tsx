import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import * as redux from 'react-redux'

import Header from './index'
import { logoutUser, selectIsAuthed } from '../../features/auth/authSlice'
import Button from '../common/Button'

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn((fn) => fn()),
}))
jest.mock('../../features/auth/authSlice')

const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
const mockDispatchFn = jest.fn()
useDispatchSpy.mockReturnValue(mockDispatchFn)

let wrapper: ShallowWrapper
beforeEach(() => {
	wrapper = shallow(<Header />)
})

describe('Header component', () => {
	it('should render correctly when logged out', () => {
		;(selectIsAuthed as jest.Mock).mockReturnValue(false)
		wrapper.setProps({})

		expect(wrapper).toMatchSnapshot()
	})

	it('should render correctly when logged in', () => {
		;(selectIsAuthed as jest.Mock).mockReturnValue(true)
		wrapper.setProps({})

		expect(wrapper).toMatchSnapshot()
	})

	it('should call logoutUser on button click', () => {
		;(selectIsAuthed as jest.Mock).mockReturnValueOnce(true)
		wrapper.find(Button).simulate('click')
		wrapper.setProps({})

		expect(logoutUser).toHaveBeenCalled()
	})
})
