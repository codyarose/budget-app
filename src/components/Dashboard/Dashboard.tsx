import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ExpenseList from '../../features/expenses/ExpenseList'
import ExpenseListFilter from '../../features/filter/ExpenseListFilter'
import ExpenseTotal from '../../features/expenses/ExpensesTotal'
import {
	selectVisibleExpenses,
	selectTotal,
	setExpenses,
} from '../../features/expenses/expensesSlice'

const Dashboard: FC = () => {
	const dispatch = useDispatch()

	const expenses = useSelector(selectVisibleExpenses)
	const total = useSelector(selectTotal)

	useEffect(() => {
		dispatch(setExpenses())
	}, [dispatch])

	return (
		<div>
			<ExpenseTotal count={expenses.length} total={total} />
			<ExpenseListFilter />
			<ExpenseList expenses={expenses} />
		</div>
	)
}

export default Dashboard
