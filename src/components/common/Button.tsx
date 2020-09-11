import React, { FC } from 'react'
import styled, { css } from 'styled-components'

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

export const buttonStyles = css`
	background: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.black};
	border: 2px solid currentColor;
	padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
	font-size: 1rem;
	box-shadow: 3px 3px 0 currentColor;
	cursor: pointer;
	transition: box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out;
	&:hover,
	&:focus {
		box-shadow: 5px 5px 0 currentColor;
		outline: none;
	}
	&:active {
		transform: translate(1px, 1px);
		box-shadow: 4px 4px 0 currentColor;
	}
`

const StyledButton = styled.button`
	${buttonStyles}
`
