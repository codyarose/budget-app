import React, { FC } from 'react'
import ExpenseListItem from '../ExpenseListItem'
import { useSelector } from 'react-redux'
import { selectVisibleExpenses } from '../expensesSlice'

const ExpenseList: FC = () => {
	const expenses = useSelector(selectVisibleExpenses)

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
