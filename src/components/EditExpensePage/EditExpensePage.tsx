import React, { ReactElement, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectExpenses,
	editExpense,
	removeExpense,
	ExpenseData,
} from '../../features/expenses/expensesSlice'
import ExpenseForm from '../../features/expenses/ExpenseForm'
import { RouteComponentProps } from 'react-router-dom'

interface Props {
	match: {
		params: {
			id: string
		}
	}
}

const EditExpensePage: FC<Props & RouteComponentProps> = ({
	match,
	history,
}): ReactElement => {
	const expenses = useSelector(selectExpenses)
	const dispatch = useDispatch()

	const id = match.params.id

	const expenseToEdit = expenses.find((expense) => expense.id === id)

	const handleSubmit = (editedExpense: ExpenseData) => {
		dispatch(editExpense({ editedExpense, id }))
		history.push('/')
	}

	const handleRemove = () => {
		dispatch(removeExpense(id))
		history.push('/')
	}

	return (
		<div>
			<ExpenseForm expense={expenseToEdit} onSubmit={handleSubmit} />
			<button onClick={handleRemove}>Remove</button>
		</div>
	)
}

export default EditExpensePage
