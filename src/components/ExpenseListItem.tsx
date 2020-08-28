import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { removeExpense, Expense } from '../features/expenses/expensesSlice'

const ExpenseListItem: FC<Expense> = ({
	description,
	amount,
	createdAt,
	id,
}) => {
	const dispatch = useDispatch()

	return (
		<div>
			<h4>{description}</h4>
			<p>
				{amount} - {createdAt}
			</p>
			<button onClick={() => dispatch(removeExpense(id))}>Remove</button>
		</div>
	)
}

export default ExpenseListItem
