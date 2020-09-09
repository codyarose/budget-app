import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'
import * as serviceWorker from './serviceWorker'
import { firebase } from './firebase/firebase'
import { setUser } from './features/auth/authSlice'
import { setExpenses } from './features/expenses/expensesSlice'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
)

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		const authUser = localStorage.getItem('authUser')
		authUser && store.dispatch(setUser(JSON.parse(authUser)))
		store.dispatch(setExpenses())
	}
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
