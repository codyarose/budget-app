import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { logoutUser } from '../../features/auth/authSlice'

const Header: FC = () => {
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())
	}
	return (
		<header>
			<h1>Budget</h1>
			<StyledNavLink exact to="/" activeClassName="is-active">
				Home
			</StyledNavLink>
			<StyledNavLink to="/create" activeClassName="is-active">
				Create
			</StyledNavLink>
			<button onClick={handleLogout}>Logout</button>
		</header>
	)
}

export default Header

const StyledNavLink = styled(NavLink)`
	&.is-active {
		font-weight: 700;
	}
`
