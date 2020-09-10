import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import ExpenseList from '../../features/expenses/ExpenseList'
import ExpenseListFilter from '../../features/filter/ExpenseListFilter'
import ExpenseTotal from '../../features/expenses/ExpensesTotal'
import {
	selectVisibleExpenses,
	selectTotal,
} from '../../features/expenses/expensesSlice'
import styled from 'styled-components'
import ContentContainer from '../common/ContentContainer'
import { Link } from 'react-router-dom'

const Dashboard: FC = () => {
	const expenses = useSelector(selectVisibleExpenses)
	const total = useSelector(selectTotal)

	return (
		<ContentContainer>
			<ExpenseTotal count={expenses.length} total={total} />
			<ExpenseListFilter />
			<ExpenseList expenses={expenses} />
			<AddExpenseButtonContainer>
				<AddExpenseButton title="Add expense" to="/create">
					+
				</AddExpenseButton>
			</AddExpenseButtonContainer>
		</ContentContainer>
	)
}

export default Dashboard

const AddExpenseButtonContainer = styled(ContentContainer)`
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	height: 100%;
	pointer-events: none;
`

const AddExpenseButton = styled(Link)`
	--sizing: ${({ theme }) => theme.spacing.lg};
	position: absolute;
	right: ${({ theme }) => theme.spacing.md};
	bottom: ${({ theme }) => theme.spacing.md};
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.black};
	border: 2px solid currentColor;
	width: var(--sizing);
	height: var(--sizing);
	text-align: center;
	padding: 0;
	border-radius: 50%;
	font-size: 3rem;
	font-weight: 300;
	box-shadow: 3px 3px 0 currentColor;
	pointer-events: all;
	transition: box-shadow 0.25s ease-in-out;
	text-decoration: none;
	&:hover {
		box-shadow: 5px 5px 0 currentColor;
	}
`
