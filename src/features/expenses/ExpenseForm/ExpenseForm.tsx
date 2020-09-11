import React, { FC, useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import moment, { Moment } from 'moment'

import { ExpenseData } from '../expensesSlice'
import Error from '../../../components/common/Error'
import { TextInput } from '../../../components/common/Inputs'
import { StyledSingleDatePicker } from '../../../components/common/DatePickers'
import Button from '../../../components/common/Button'

interface Props {
	expense?: ExpenseData
	onSubmit: (arg0: ExpenseData) => void
}

interface FormState extends Omit<ExpenseData, 'amount'> {
	amount: string
}

const ExpenseForm: FC<Props> = ({ expense, onSubmit }) => {
	const [formState, setFormState] = useState<FormState>({
		description: expense?.description || '',
		amount: expense ? (expense?.amount / 100).toString() : '',
		note: expense?.note || '',
		createdAt: expense?.createdAt || moment().valueOf(),
	})

	const [error, setError] = useState('')

	const [calendarFocused, setCalendarFocused] = useState<boolean | null>(
		false,
	)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormState({
			...formState,
			[name]: value,
		})
	}

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const amount = e.target.value
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
			setFormState({ ...formState, amount })
		}
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		const { description, amount } = formState
		if (!description || !amount) {
			setError('Please provide description and amount.')
		} else {
			setError('')
			const parsedAmount = parseFloat(amount) * 100
			onSubmit({
				...formState,
				amount: parsedAmount,
			})
		}
	}

	const handleDateChange = (createdAt: Moment | null) => {
		createdAt &&
			setFormState({ ...formState, createdAt: createdAt.valueOf() })
	}

	const handleFocusChange = (arg: { focused: boolean | null }) => {
		setCalendarFocused(arg.focused)
	}

	return (
		<StyledForm onSubmit={handleSubmit}>
			<TextInput
				type="text"
				placeholder="Description"
				name="description"
				id="expenseDescription"
				autoFocus
				value={formState.description}
				onChange={handleInputChange}
			/>
			<TextInput
				type="text"
				placeholder="Amount"
				name="amount"
				id="expenseAmount"
				value={formState.amount || ''}
				onChange={handleAmountChange}
			/>
			<StyledSingleDatePicker
				date={moment(formState.createdAt)}
				onDateChange={handleDateChange}
				focused={calendarFocused}
				onFocusChange={handleFocusChange}
				id="datePicker"
				numberOfMonths={1}
				isOutsideRange={() => false}
			/>
			<TextInput
				type="text"
				name="note"
				id="expenseNote"
				placeholder="Add a note to your expense (optional)"
				value={formState.note}
				onChange={handleInputChange}
			/>
			<Error error={!!error} helperText={error} />
			<StyledSubmitButton>
				{expense ? 'Update' : 'Add'} expense
			</StyledSubmitButton>
		</StyledForm>
	)
}

export default ExpenseForm

const StyledForm = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	gap: ${({ theme }) => theme.spacing.md};
`

StyledForm.displayName = 'StyledForm'

const StyledSubmitButton = styled(Button)`
	width: 100%;
	max-width: 50%;
	min-width: 200px;
	padding: ${({ theme }) => `${theme.spacing.sm}`};
	margin: ${({ theme }) => theme.spacing.sm} auto 0 auto;
`
