import React, { FC, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'

import theme from './theme'
import { GlobalStyles } from './theme/globalStyles'
import AppRouter from './routes/AppRouter'
import { selectUid } from './features/auth/authSlice'
import { setExpenses, selectExpenses } from './features/expenses/expensesSlice'

const App: FC = () => {
	const uid = useSelector(selectUid)
	const expenses = useSelector(selectExpenses)
	const dispatch = useDispatch()

	useEffect(() => {
		!!!expenses.length && dispatch(setExpenses(uid))
	}, [uid, dispatch, expenses.length])

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<AppRouter />
		</ThemeProvider>
	)
}

export default App
