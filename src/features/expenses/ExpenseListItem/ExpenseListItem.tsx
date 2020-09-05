import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

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
				{numeral(amount / 100).format('$0,0.00')}-
				{moment(createdAt).format('MMMM Do, YYYY')}
			</p>
			{note && <p>{note}</p>}
		</div>
	)
}

export default ExpenseListItem
