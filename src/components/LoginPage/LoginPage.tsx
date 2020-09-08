import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectIsAuthed } from '../../features/auth/authSlice'
import { RouteComponentProps } from 'react-router-dom'

type Props = RouteComponentProps

const LoginPage: FC<Props> = ({ history }) => {
	const dispatch = useDispatch()
	const isAuthed = useSelector(selectIsAuthed)

	const handleClick = () => {
		dispatch(loginUser())
	}

	useEffect(() => {
		isAuthed && history.push('/')
	}, [isAuthed, history])

	return (
		<div>
			<h3>Login</h3>
			<button onClick={handleClick}>Login</button>
		</div>
	)
}

export default LoginPage
