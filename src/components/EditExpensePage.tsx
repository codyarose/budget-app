import React, { ReactElement, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectExpenses,
	editExpense,
	removeExpense,
} from '../features/expenses/expensesSlice'
import ExpenseForm from './ExpenseForm'
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

	return (
		<div>
			<ExpenseForm
				expense={expenseToEdit}
				onSubmit={(editedExpense) => {
					dispatch(editExpense({ editedExpense, id }))
					history.push('/')
				}}
			/>
			<button
				onClick={() => {
					dispatch(removeExpense(id))
					history.push('/')
				}}
			>
				Remove
			</button>
		</div>
	)
}

export default EditExpensePage
