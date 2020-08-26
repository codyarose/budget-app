import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'

import theme from './theme'
import { GlobalStyles } from './theme/globalStyles'
import AppRouter from './routes/AppRouter'

// import { Counter } from './features/counter/Counter';

const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<AppRouter />
		</ThemeProvider>
	)
}

export default App
