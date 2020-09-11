import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'
import * as serviceWorker from './serviceWorker'
import { firebase } from './firebase/firebase'
import { setUser, logoutUser } from './features/auth/authSlice'
import { setExpenses } from './features/expenses/expensesSlice'
import LoadingPage from './components/LoadingPage'
import { ThemeProvider } from './theme/ThemeContext'

const jsx = (
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
)

let hasRendered = false
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('root'))
		hasRendered = true
	}
}

ReactDOM.render(
	<ThemeProvider>
		<LoadingPage />
	</ThemeProvider>,
	document.getElementById('root'),
)

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		const authUser = localStorage.getItem('authUser')
		if (authUser) {
			const authUserData = JSON.parse(authUser)
			store.dispatch(setUser(authUserData))
			store.dispatch(setExpenses(user.uid)).then(() => {
				renderApp()
			})
		}
	} else {
		store.dispatch(logoutUser())
		renderApp()
	}
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
