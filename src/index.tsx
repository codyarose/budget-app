import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'
import * as serviceWorker from './serviceWorker'
import { firebase } from './firebase/firebase'

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
		console.log('login')
	} else {
		console.log('logout')
	}
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
