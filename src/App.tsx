import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'

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

	return <AppRouter />
}

export default App
