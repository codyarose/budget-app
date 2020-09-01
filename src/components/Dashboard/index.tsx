import React, { FC } from 'react'
import ExpenseList from '../../features/expenses/ExpenseList'
import ExpenseListFilter from '../../features/filter/ExpenseListFilter'

const Dashboard: FC = () => {
	return (
		<div>
			<ExpenseListFilter />
			<ExpenseList />
		</div>
	)
}

export default Dashboard
