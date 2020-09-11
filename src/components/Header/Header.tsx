import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'

import { logoutUser, selectIsAuthed } from '../../features/auth/authSlice'
import ContentContainer from '../common/ContentContainer'
import Button from '../common/Button'
import { useThemeValue } from '../../theme/ThemeContext'
// import { SelectInput } from '../common/Inputs'

const Header: FC = () => {
	const dispatch = useDispatch()
	const isAuthed = useSelector(selectIsAuthed)
	const { updateTheme, selectedTheme } = useThemeValue()

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	const handleChange = (checked: boolean) => {
		const value = checked ? 'dark' : 'light'
		updateTheme!(value)
	}

	const DarkIcon = (
		<StyledIcon
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="#fff"
			width="20"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			/>
		</StyledIcon>
	)

	const SunIcon = (
		<StyledIcon
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="#000"
			width="20"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			/>
		</StyledIcon>
	)

	const isChecked = () => (selectedTheme === 'dark' ? true : false)

	return (
		<>
			{isAuthed && (
				<StyledHeader>
					<StyledContent>
						<StyledTitle to="/">
							<h1>Expenses</h1>
						</StyledTitle>
						<Switch
							onChange={handleChange}
							checked={isChecked()}
							uncheckedIcon={DarkIcon}
							checkedIcon={SunIcon}
							offColor="#000"
							onColor="#fff"
							onHandleColor="#000"
							handleDiameter={22}
						/>
						<Button onClick={handleLogout}>Logout</Button>
					</StyledContent>
				</StyledHeader>
			)}
		</>
	)
}

export default Header

const StyledHeader = styled.header`
	padding: ${({ theme }) => `${theme.spacing.md} 0`};
`
const StyledContent = styled(ContentContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const StyledTitle = styled(Link)`
	color: ${({ theme }) => theme.colors.fg};
	text-decoration: none;
	transition: color 0.2s ease-in-out;
	h1 {
		margin: 0;
		@media screen and (max-width: 450px) {
			font-size: 1.5em;
		}
	}
`

const StyledIcon = styled.svg`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`
