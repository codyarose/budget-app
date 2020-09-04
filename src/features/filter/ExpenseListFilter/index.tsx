import React, { FC, ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { DateRangePicker } from 'react-dates'
import moment from 'moment'

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
		<div>
			<input
				type="text"
				name="textFilter"
				value={textFilter}
				onChange={handleTextFilterChange}
			/>
			<select
				name="sortFilter"
				value={sortByFilter}
				onChange={handleSortByChange}
			>
				<option value="date">Date</option>
				<option value="amount">Amount</option>
			</select>
			<DateRangePicker
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
		</div>
	)
}

export default ExpenseListFilter
