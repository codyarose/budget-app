import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import expensesReducer from '../features/expenses/expensesSlice'
import filterReducer from '../features/filter/filterSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
	reducer: {
		expenses: expensesReducer,
		filter: filterReducer,
		auth: authReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
