import React, { FC, ChangeEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate,
} from '../features/filter/filterSlice'
import { DateRangePicker } from 'react-dates'

const ExpenseListFilter: FC = () => {
	const { text, sortBy, startDate, endDate } = useSelector(
		(state: RootState) => state.filter,
	)
	const dispatch = useDispatch()

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
				value={text}
				onChange={handleTextFilterChange}
			/>
			<select
				name="sortFilter"
				value={sortBy}
				onChange={handleSortByChange}
			>
				<option value="date">Date</option>
				<option value="amount">Amount</option>
			</select>
			<DateRangePicker
				startDate={startDate}
				startDateId="startDateId"
				endDate={endDate}
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
