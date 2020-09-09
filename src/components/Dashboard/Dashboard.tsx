import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import ExpenseList from '../../features/expenses/ExpenseList'
import ExpenseListFilter from '../../features/filter/ExpenseListFilter'
import ExpenseTotal from '../../features/expenses/ExpensesTotal'
import {
	selectVisibleExpenses,
	selectTotal,
} from '../../features/expenses/expensesSlice'

const Dashboard: FC = () => {
	const expenses = useSelector(selectVisibleExpenses)
	const total = useSelector(selectTotal)

	return (
		<div>
			<ExpenseTotal count={expenses.length} total={total} />
			<ExpenseListFilter />
			<ExpenseList expenses={expenses} />
		</div>
	)
}

export default Dashboard
