import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import * as redux from 'react-redux'

import LoginPage from './index'
import { loginUser, selectIsAuthed } from '../../features/auth/authSlice'
import { SignInWithGoogle } from '../common/SignInWithGoogle'

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn((fn) => fn()),
}))
jest.mock('../../features/auth/authSlice')

const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
const mockDispatchFn = jest.fn()
useDispatchSpy.mockReturnValue(mockDispatchFn)

let wrapper: ShallowWrapper, props: any
beforeEach(() => {
	props = {
		history: { push: jest.fn() },
	}
	wrapper = shallow(<LoginPage {...props} />)
})

describe('LoginPage', () => {
	it('should render correctly', () => {
		;(selectIsAuthed as jest.Mock).mockReturnValue(false)

		expect(wrapper).toMatchSnapshot()
	})

	it('should call loginUser on button click', () => {
		wrapper.find(SignInWithGoogle).simulate('click')

		expect(loginUser).toHaveBeenCalled()
	})
})
