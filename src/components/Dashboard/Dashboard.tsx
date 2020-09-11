import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import ExpenseList from '../../features/expenses/ExpenseList'
import ExpenseListFilter from '../../features/filter/ExpenseListFilter'
import ExpenseTotal from '../../features/expenses/ExpensesTotal'
import {
	selectVisibleExpenses,
	selectTotal,
} from '../../features/expenses/expensesSlice'
import ContentContainer from '../common/ContentContainer'
import { buttonStyles } from '../common/Button'

const Dashboard: FC = () => {
	const expenses = useSelector(selectVisibleExpenses)
	const total = useSelector(selectTotal)

	return (
		<ContentContainer padBottom={true}>
			<ExpenseTotal count={expenses.length} total={total} />
			<ExpenseListFilter />
			<ExpenseList expenses={expenses} />
			<AddExpenseButton title="Add expense" to="/create">
				+
			</AddExpenseButton>
		</ContentContainer>
	)
}

export default Dashboard

const AddExpenseButton = styled(Link)`
	${buttonStyles}
	--sizing: ${({ theme }) => theme.spacing.lg};
	position: sticky;
	left: 100%;
	bottom: ${({ theme }) => theme.spacing.lg};
	margin-top: ${({ theme }) => theme.spacing.sm};
	display: flex;
	justify-content: center;
	align-items: center;
	width: var(--sizing);
	height: var(--sizing);
	text-align: center;
	padding: 0;
	border-radius: 50%;
	font-size: 3rem;
	font-weight: 300;
	pointer-events: all;
	text-decoration: none;
`
