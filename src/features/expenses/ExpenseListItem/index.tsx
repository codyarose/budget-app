import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { Expense } from '../expensesSlice'

const ExpenseListItem: FC<Expense> = ({
	description,
	amount,
	createdAt,
	note,
	id,
}) => {
	return (
		<div>
			<Link to={`/edit/${id}`}>
				<h4>{description}</h4>
			</Link>
			<p>
				{amount} - {createdAt}
			</p>
			{note && <p>{note}</p>}
		</div>
	)
}

export default ExpenseListItem
