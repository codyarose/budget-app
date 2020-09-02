import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'
import 'react-dates/lib/css/_datepicker.css'

import theme from './theme'
import { GlobalStyles } from './theme/globalStyles'
import AppRouter from './routes/AppRouter'

const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<AppRouter />
		</ThemeProvider>
	)
}

export default App
