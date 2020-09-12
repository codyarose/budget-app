import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectIsAuthed } from '../../features/auth/authSlice'
import { RouteComponentProps } from 'react-router-dom'
import BoxLayout from '../common/BoxLayout'
import { SignInWithGoogle } from '../common/SignInWithGoogle'
import styled from 'styled-components'

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
		<BoxLayout.Layout>
			<BoxLayout.Box>
				<Title>Expense tracking app</Title>
				<Subtitle>built with React, Typescript, and Firebase</Subtitle>
				<p>To try it out:</p>
				<SignInWithGoogle onClick={handleClick} />
			</BoxLayout.Box>
		</BoxLayout.Layout>
	)
}

export default LoginPage

const Title = styled.h2`
	margin: 0 0 ${({ theme }) => theme.spacing.xs};
	font-size: 2rem;
	@media ${({ theme }) => theme.breakpoint.sm} {
		font-size: 1.5rem;
	}
`
const Subtitle = styled.h4`
	margin: 0 0 ${({ theme }) => theme.spacing.md};
	font-size: 1rem;
	font-weight: 500;
`
