import React from 'react'
import { shallow } from 'enzyme'
import * as redux from 'react-redux'

import AddExpensePage from './index'
import ExpenseForm from '../../features/expenses/ExpenseForm'
import expenses from '../../features/expenses/fixtures'
import { addExpense } from '../../features/expenses/expensesSlice'

describe('AddExpensePage', () => {
	const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
	const mockDispatchFn = jest.fn()
	useDispatchSpy.mockReturnValue(mockDispatchFn)

	let props: any, wrapper: any
	beforeEach(() => {
		props = {
			onSubmit: mockDispatchFn,
			history: { push: jest.fn() },
		}
		wrapper = shallow(<AddExpensePage {...props} />)
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should handle onSubmit', () => {
		wrapper.find(ExpenseForm).prop('onSubmit')(expenses[1])

		expect(props.history.push).toHaveBeenLastCalledWith('/')
		expect(mockDispatchFn).toHaveBeenLastCalledWith({
			payload: expenses[1],
			type: addExpense.type,
		})
	})
})
