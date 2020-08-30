import React, { FC, useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import moment, { Moment } from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'

import { Expense } from '../features/expenses/expensesSlice'
import Error from './Error'

interface Props {
	expense?: Expense
	onSubmit: (arg0: Partial<Expense>) => void
}

interface FormState extends Omit<Expense, 'amount'> {
	amount: string
}

const ExpenseForm: FC<Props> = ({ expense, onSubmit }) => {
	const [formState, setFormState] = useState<Partial<FormState>>({
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
		<div>
			<StyledForm onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Description"
					name="description"
					autoFocus
					value={formState.description}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					placeholder="Amount"
					name="amount"
					value={formState.amount || ''}
					onChange={handleAmountChange}
				/>
				<Error error={!!error} helperText={error} />
				<SingleDatePicker
					date={moment(formState.createdAt)}
					onDateChange={handleDateChange}
					focused={calendarFocused}
					onFocusChange={handleFocusChange}
					id="datePicker"
					numberOfMonths={1}
					isOutsideRange={() => false}
				/>
				<input
					type="text"
					name="note"
					placeholder="Add a not for your expense (optional)"
					value={formState.note}
					onChange={handleInputChange}
				/>
				<button type="submit">Add expense</button>
			</StyledForm>
		</div>
	)
}

export default ExpenseForm

const StyledForm = styled.form`
	display: flex;
	flex-flow: column;
`
