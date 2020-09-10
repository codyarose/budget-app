import React, { FC } from 'react'
import ExpenseForm from '../../features/expenses/ExpenseForm'
import { useDispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import { addExpense, ExpenseData } from '../../features/expenses/expensesSlice'
import ContentContainer from '../common/ContentContainer'
import PageHeader from '../common/PageHeader'

type Props = RouteComponentProps

const AddExpensePage: FC<Props> = ({ history }) => {
	const dispatch = useDispatch()

	const handleSubmit = (expense: ExpenseData) => {
		dispatch(addExpense(expense))
		history.push('/')
	}

	return (
		<ContentContainer>
			<PageHeader>
				<h2>Add expense</h2>
			</PageHeader>
			<ExpenseForm onSubmit={handleSubmit} />
		</ContentContainer>
	)
}

export default AddExpensePage
