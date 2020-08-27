import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
	text: string
	sortBy: string
	startDate: unknown
	endDate: unknown
}

const initialState: FilterState = {
	text: '',
	sortBy: 'date',
	startDate: '',
	endDate: '',
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
		setStartDate: (
			state,
			action: PayloadAction<Pick<FilterState, 'startDate'>>,
		) => {
			state.startDate = action.payload
		},
		setEndDate: (
			state,
			action: PayloadAction<Pick<FilterState, 'endDate'>>,
		) => {
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
