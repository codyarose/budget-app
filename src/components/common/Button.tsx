import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
	onClick?: () => void
	className?: string
	title?: string
}

const Button: FC<Props> = ({ onClick, children, className, title }) => {
	return (
		<StyledButton onClick={onClick} className={className} title={title}>
			{children}
		</StyledButton>
	)
}

export default Button

const StyledButton = styled.button`
	background: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.black};
	border: 2px solid currentColor;
	padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
	font-size: 1rem;
	box-shadow: 3px 3px 0 currentColor;
	cursor: pointer;
	transition: box-shadow 0.25s ease-in-out;
	&:hover {
		box-shadow: 5px 5px 0 currentColor;
	}
`
