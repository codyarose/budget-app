import React, { FC, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import {
	setTextFilter,
	sortByDate,
	sortByAmount,
} from '../features/filter/filterSlice'

const ExpenseListFilter: FC = () => {
	const { text } = useSelector((state: RootState) => state.filter)
	const dispatch = useDispatch()

	const handleTextFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setTextFilter(e.target.value))
	}

	const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target
		value === 'date'
			? dispatch(sortByDate())
			: value === 'amount' && dispatch(sortByAmount())
	}

	return (
		<div>
			<input
				type="text"
				name="textFilter"
				value={text}
				onChange={handleTextFilterChange}
			/>
			<select name="sortFilter" id="" onChange={handleSortByChange}>
				<option value="date">Date</option>
				<option value="amount">Amount</option>
			</select>
		</div>
	)
}

export default ExpenseListFilter
