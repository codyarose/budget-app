import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { removeExpense } from '../features/expenses/expensesSlice'

interface Props {
	description: string
	amount: number
	createdAt: number
	id: string
}

const ExpenseListItem: FC<Props> = ({ description, amount, createdAt, id }) => {
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
