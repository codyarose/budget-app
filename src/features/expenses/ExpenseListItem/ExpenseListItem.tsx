import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import { rgba } from 'polished'

import { Expense } from '../expensesSlice'
import styled from 'styled-components'

const ExpenseListItem: FC<Expense> = ({
	description,
	amount,
	createdAt,
	id,
}) => {
	return (
		<li>
			<StyledLink to={`/edit/${id}`}>
				<div>
					<StyledTitle>{description}</StyledTitle>
					<StyledSubtitle>
						{moment(createdAt).format('MMMM Do, YYYY')}
					</StyledSubtitle>
				</div>
				<StyledAmount>
					{numeral(amount / 100).format('$0,0.00')}
				</StyledAmount>
			</StyledLink>
		</li>
	)
}

export default ExpenseListItem

const StyledLink = styled(Link)`
	display: grid;
	grid-template-columns: minmax(300px, 1fr) 1fr;
	column-gap: ${({ theme }) => theme.spacing.md};
	align-items: center;
	padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
	color: ${({ theme }) => theme.colors.fg};
	text-decoration: none;
	transition: background-color 0.1s ease-out, color 0.2s ease-in-out;
	@media screen and (max-width: 600px) {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		row-gap: ${({ theme }) => theme.spacing.sm};
		padding: ${({ theme }) => `${theme.spacing.sm}`};
	}

	&:hover {
		background-color: ${({ theme }) => rgba(theme.colors.fg, 0.1)};
	}
`

const StyledTitle = styled.h3`
	margin: 0;
	word-break: break-all;
`

const StyledSubtitle = styled.span`
	font-size: 0.9rem;
	line-height: 2.5;
`

const StyledAmount = styled.span`
	font-size: 1.17em;
	font-weight: 700;
	word-break: break-all;
	@media screen and (min-width: 600px) {
		text-align: right;
	}
`
