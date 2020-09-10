import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { logoutUser, selectIsAuthed } from '../../features/auth/authSlice'
import ContentContainer from '../common/ContentContainer'

const Header: FC = () => {
	const dispatch = useDispatch()
	const isAuthed = useSelector(selectIsAuthed)

	const handleLogout = () => {
		dispatch(logoutUser())
	}
	return (
		<>
			{isAuthed && (
				<StyledHeader>
					<StyledContent>
						<StyledTitle to="/">
							<h1>Expenses</h1>
						</StyledTitle>
						<button onClick={handleLogout}>Logout</button>
					</StyledContent>
				</StyledHeader>
			)}
		</>
	)
}

export default Header

const StyledHeader = styled.header`
	padding: ${({ theme }) => `${theme.spacing.sm} 0`};
`
const StyledContent = styled(ContentContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const StyledTitle = styled(Link)`
	color: ${({ theme }) => theme.colors.black};
	text-decoration: none;
	h1 {
		margin: 0;
	}
`
