import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment, { Moment } from 'moment'
import { RootState } from '../../app/store'

export interface FilterState {
	text: string
	sortBy: string
	startDate: Moment
	endDate: Moment
}

export const initialState: FilterState = {
	text: '',
	sortBy: 'date',
	startDate: moment().startOf('month'),
	endDate: moment().endOf('month'),
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
