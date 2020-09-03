import React, { FC } from 'react'
import ExpenseForm from '../../features/expenses/ExpenseForm'
import { useDispatch } from 'react-redux'
import { addExpense, ExpenseData } from '../../features/expenses/expensesSlice'
import { RouteComponentProps } from 'react-router-dom'

type Props = RouteComponentProps

const AddExpensePage: FC<Props> = ({ history }) => {
	const dispatch = useDispatch()

	const handleSubmit = (expense: ExpenseData) => {
		dispatch(addExpense(expense))
		history.push('/')
	}

	return (
		<div>
			<h2>Add expense</h2>
			<ExpenseForm onSubmit={handleSubmit} />
		</div>
	)
}

export default AddExpensePage
