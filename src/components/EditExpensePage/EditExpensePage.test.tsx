import React from 'react'
import { shallow } from 'enzyme'
import * as redux from 'react-redux'

import EditExpensePage from './index'
import {
	editExpense,
	removeExpense,
} from '../../features/expenses/expensesSlice'
import expenses from '../../features/expenses/fixtures'
import ExpenseForm from '../../features/expenses/ExpenseForm'

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn().mockImplementation((selector) => selector()),
}))
jest.mock('../../features/expenses/expensesSlice', () => {
	return {
		selectExpenses: jest.fn().mockReturnValue([
			{
				id: '123abc',
				description: 'Title',
				note: '',
				amount: 140500,
				createdAt: 1598763926001,
			},
		]),
		editExpense: jest.fn(),
		removeExpense: jest.fn(),
	}
})

describe('EditExpensePage', () => {
	const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
	const mockDispatchFn = jest.fn()
	useDispatchSpy.mockReturnValue(mockDispatchFn)

	let props: any, wrapper: any
	beforeEach(() => {
		props = {
			match: {
				params: {
					id: expenses[0].id,
				},
			},
			onSubmit: mockDispatchFn,
			history: { push: jest.fn() },
		}
		wrapper = shallow(<EditExpensePage {...props} />)
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should handle editExpense', () => {
		wrapper.find(ExpenseForm).prop('onSubmit')(expenses[0])

		expect(props.history.push).toHaveBeenLastCalledWith('/')
		expect(editExpense).toHaveBeenLastCalledWith({
			editedExpense: expenses[0],
			id: expenses[0].id,
		})
	})

	it('should handle removeExpense', () => {
		wrapper.find('button').simulate('click')

		expect(props.history.push).toHaveBeenLastCalledWith('/')
		expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id)
	})
})
