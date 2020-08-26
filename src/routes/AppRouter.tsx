import React, { FC } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../components/Dashboard'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import FourOhFourPage from '../components/FourOhFourPage'
import Header from '../components/Header'

const AppRouter: FC = () => {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/create" component={AddExpensePage} />
				<Route exact path="/edit/:id" component={EditExpensePage} />
				<Route exact path="/help" component={HelpPage} />
				<Route component={FourOhFourPage} />
			</Switch>
		</BrowserRouter>
	)
}

export default AppRouter
