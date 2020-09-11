import React, { FC } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import ExpenseListItem from '../ExpenseListItem'
import { Expense } from '../expensesSlice'

interface Props {
	expenses: Expense[]
}

const ExpenseList: FC<Props> = ({ expenses }) => {
	return (
		<StyledWrapper>
			{expenses.length === 0 ? (
				<StyledNoExpenses>
					Use the{' '}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						width="25"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>{' '}
					below to add an expense
				</StyledNoExpenses>
			) : (
				<>
					<StyledListHeader>
						<div className="show-for-mobile">Expenses</div>
						<div className="hide-for-mobile">Expense</div>
						<div className="hide-for-mobile">Amount</div>
					</StyledListHeader>
					<StyledExpenseList>
						{expenses.map((expense) => (
							<ExpenseListItem key={expense.id} {...expense} />
						))}
					</StyledExpenseList>
				</>
			)}
		</StyledWrapper>
	)
}

export default ExpenseList

const StyledWrapper = styled.div`
	padding-top: ${({ theme }) => theme.spacing.sm};
`

const StyledListHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
	color: ${({ theme }) => rgba(theme.colors.black, 0.5)};
	border-bottom: 1px solid currentColor;
`

const StyledExpenseList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	& > *:not(:last-of-type) {
		border-bottom: 1px solid ${({ theme }) => rgba(theme.colors.black, 0.5)};
	}
`

const StyledNoExpenses = styled.div`
	text-align: center;
	font-size: 1.5rem;
`
