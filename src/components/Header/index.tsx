import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Header: FC = () => {
	return (
		<header>
			<h1>Budget</h1>
			<StyledNavLink exact to="/" activeClassName="is-active">
				Home
			</StyledNavLink>
			<StyledNavLink to="/create" activeClassName="is-active">
				Create
			</StyledNavLink>
		</header>
	)
}

export default Header

const StyledNavLink = styled(NavLink)`
	&.is-active {
		font-weight: 700;
	}
`
