import {
	configureStore,
	ThunkAction,
	Action,
	getDefaultMiddleware,
} from '@reduxjs/toolkit'

import expensesReducer from '../features/expenses/expensesSlice'
import filterReducer from '../features/filter/filterSlice'

export const store = configureStore({
	reducer: {
		expenses: expensesReducer,
		filter: filterReducer,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredPaths: ['filter.startDate', 'filter.endDate'],
		},
	}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
