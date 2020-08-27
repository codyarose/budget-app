import React, { FC } from 'react'
import { selectVisibleExpenses } from '../features/expenses/expensesSlice'
import { useSelector } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'

const ExpenseList: FC = () => {
	const expenses = useSelector(selectVisibleExpenses)
	return (
		<div>
			<h1>Expense List</h1>
			{expenses.map((expense) => (
				<ExpenseListItem key={expense.id} {...expense} />
			))}
		</div>
	)
}

export default ExpenseList
