import React, { FC } from 'react'
import ExpenseForm from '../features/expenses/ExpenseForm'
import { useDispatch } from 'react-redux'
import { addExpense } from '../features/expenses/expensesSlice'
import { RouteComponentProps } from 'react-router-dom'

type Props = RouteComponentProps

const AddExpensePage: FC<Props> = ({ history }) => {
	const dispatch = useDispatch()
	return (
		<div>
			<h2>Add expense</h2>
			<ExpenseForm
				onSubmit={(expense) => {
					dispatch(addExpense(expense))
					history.push('/')
				}}
			/>
		</div>
	)
}

export default AddExpensePage
