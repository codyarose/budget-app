import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'

import theme from './theme'
import { GlobalStyles } from './theme/globalStyles'
import AppRouter from './routes/AppRouter'

// import { store } from './app/store'
// import { addExpense } from './features/expenses/expensesSlice'

// store.dispatch(addExpense({ description: 'water bill', amount: 450 }))
// store.dispatch(addExpense({ description: 'gas bill', createdAt: 1000 }))
// store.dispatch(addExpense({ description: 'rent', amount: 140500 }))

const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<AppRouter />
		</ThemeProvider>
	)
}

export default App
