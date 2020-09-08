import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../features/auth/authSlice'

const LoginPage: FC = () => {
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(loginUser())
	}
	return (
		<div>
			<button onClick={handleClick}>Login</button>
		</div>
	)
}

export default LoginPage
