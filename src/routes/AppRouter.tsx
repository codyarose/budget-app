import React, { FC } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import FourOhFourPage from '../components/FourOhFourPage'
import Header from '../components/Header'
import LoginPage from '../components/LoginPage'
import AuthRoute from './AuthRoute'

const AppRouter: FC = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/login" component={LoginPage} />
				<AuthRoute exact path="/" component={Dashboard} />
				<AuthRoute exact path="/create" component={AddExpensePage} />
				<AuthRoute exact path="/edit/:id" component={EditExpensePage} />
				<Route component={FourOhFourPage} />
			</Switch>
		</BrowserRouter>
	)
}

export default AppRouter
