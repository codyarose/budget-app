import React, { FC } from 'react'
import ExpenseListItem from '../ExpenseListItem'
import { Expense } from '../expensesSlice'

interface Props {
	expenses: Expense[]
}

const ExpenseList: FC<Props> = ({ expenses }) => {
	return (
		<div>
			{expenses.length === 0 ? (
				<p>Add an expense</p>
			) : (
				expenses.map((expense) => (
					<ExpenseListItem key={expense.id} {...expense} />
				))
			)}
		</div>
	)
}

export default ExpenseList
