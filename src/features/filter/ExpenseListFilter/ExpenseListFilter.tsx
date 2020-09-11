import React, { FC, ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'

import {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate,
	selectText,
	selectSortBy,
	selectStartDate,
	selectEndDate,
} from '../filterSlice'
import { TextInput, SelectInput } from '../../../components/common/Inputs'
import { StyledDateRangePicker } from '../../../components/common/DatePickers'

const ExpenseListFilter: FC = () => {
	const textFilter = useSelector(selectText)
	const sortByFilter = useSelector(selectSortBy)
	const startDateFilter = useSelector(selectStartDate)
	const endDateFilter = useSelector(selectEndDate)
	const dispatch = useDispatch()

	const momentStartDate = moment(startDateFilter)
	const momentEndDate = moment(endDateFilter)

	const [calendarFocused, setCalendarFocused] = useState<
		'startDate' | 'endDate' | null
	>(null)

	const handleTextFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setTextFilter(e.target.value))
	}

	const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target
		value === 'date'
			? dispatch(sortByDate())
			: value === 'amount' && dispatch(sortByAmount())
	}

	const handleDatesChange = ({ startDate, endDate }: any) => {
		dispatch(setStartDate(startDate))
		dispatch(setEndDate(endDate))
	}

	const handleFocusChange = (
		calendarFocused: 'startDate' | 'endDate' | null,
	) => {
		setCalendarFocused(calendarFocused)
	}

	return (
		<StyledFiltersContainer>
			<TextInput
				type="text"
				name="textFilter"
				value={textFilter}
				placeholder="Search expenses"
				onChange={handleTextFilterChange}
			/>
			<SelectInput
				name="sortFilter"
				value={sortByFilter}
				onChange={handleSortByChange}
			>
				<option value="date">Date</option>
				<option value="amount">Amount</option>
			</SelectInput>
			<StyledDateRangePicker
				startDate={momentStartDate}
				startDateId="startDateId"
				endDate={momentEndDate}
				endDateId="endDateId"
				onDatesChange={handleDatesChange}
				focusedInput={calendarFocused}
				onFocusChange={handleFocusChange}
				numberOfMonths={1}
				isOutsideRange={() => false}
				showClearDates={true}
			/>
		</StyledFiltersContainer>
	)
}

export default ExpenseListFilter

const StyledFiltersContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, auto);
	gap: ${({ theme }) => theme.spacing.sm};
	padding: ${({ theme }) => `${theme.spacing.md} 0`};
	@media screen and (max-width: 770px) {
		grid-template-columns: auto auto;
		grid-template-rows: auto;
	}
	@media ${({ theme }) => theme.breakpoint.sm} {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}
`
