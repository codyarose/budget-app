import React, { ReactElement, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { lighten } from 'polished'

import {
	selectExpenses,
	editExpense,
	removeExpense,
	ExpenseData,
} from '../../features/expenses/expensesSlice'
import ExpenseForm from '../../features/expenses/ExpenseForm'
import ContentContainer from '../common/ContentContainer'
import Button from '../common/Button'
import PageHeader from '../common/PageHeader'

interface Props {
	match: {
		params: {
			id: string
		}
	}
}

const EditExpensePage: FC<Props & RouteComponentProps> = ({
	match,
	history,
}): ReactElement => {
	const expenses = useSelector(selectExpenses)
	const dispatch = useDispatch()

	const id = match.params.id

	const expenseToEdit = expenses.find((expense) => expense.id === id)

	const handleSubmit = (editedExpense: ExpenseData) => {
		dispatch(editExpense({ editedExpense, id }))
		history.push('/')
	}

	const handleRemove = () => {
		dispatch(removeExpense(id))
		history.push('/')
	}

	return (
		<ContentContainer padBottom={true}>
			<PageHeader>
				<h2>Edit Expense</h2>
			</PageHeader>
			<ExpenseForm expense={expenseToEdit} onSubmit={handleSubmit} />
			<StyledRemoveButton onClick={handleRemove}>
				Remove
			</StyledRemoveButton>
		</ContentContainer>
	)
}

export default EditExpensePage

const StyledRemoveButton = styled(Button)`
	display: block;
	width: 100%;
	max-width: 40%;
	min-width: 180px;
	color: ${({ theme }) =>
		theme.colors.bg === '#000' ? lighten(0.4, 'darkred') : 'darkred'};
	padding: ${({ theme }) => `${theme.spacing.sm}`};
	margin: ${({ theme }) => `${theme.spacing.sm} auto 0`};
`
StyledRemoveButton.displayName = 'RemoveButton'
