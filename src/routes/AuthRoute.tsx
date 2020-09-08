import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthed } from '../features/auth/authSlice'

const AuthRoute = (props: any) => {
	const { component: Component, ...rest } = props
	const isAuthed = useSelector(selectIsAuthed)

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthed ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	)
}

export default AuthRoute
