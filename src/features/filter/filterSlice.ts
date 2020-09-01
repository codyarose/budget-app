import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Moment } from 'moment'
import { RootState } from '../../app/store'
import moment from 'moment'

export interface FilterState {
	text: string
	sortBy: string
	startDate: Moment | number
	endDate: Moment | number
}

export const initialState: FilterState = {
	text: '',
	sortBy: 'date',
	startDate: moment().startOf('month').valueOf(),
	endDate: moment().endOf('month').valueOf(),
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setTextFilter: (state, action: PayloadAction<string>) => {
			state.text = action.payload
		},
		sortByDate: (state) => {
			state.sortBy = 'date'
		},
		sortByAmount: (state) => {
			state.sortBy = 'amount'
		},
		setStartDate: (state, action: PayloadAction<Moment>) => {
			state.startDate = action.payload
		},
		setEndDate: (state, action: PayloadAction<Moment>) => {
			state.endDate = action.payload
		},
	},
})

export const {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate,
} = filterSlice.actions

export default filterSlice.reducer

export const selectFilters = (state: RootState): FilterState => state.filter
export const selectText = (state: RootState): string => state.filter.text
export const selectSortBy = (state: RootState): string => state.filter.sortBy
export const selectStartDate = (state: RootState): Moment | number =>
	state.filter.startDate
export const selectEndDate = (state: RootState): Moment | number =>
	state.filter.endDate
