import styled, { css } from 'styled-components'

const baseStyles = css`
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.black};
	font-size: 1rem;
	border: none;
	border-bottom: 2px solid currentColor;
	padding: ${({ theme }) => `${theme.spacing.sm}`};
`

export const TextInput = styled.input`
	${baseStyles}
`

export const SelectInput = styled.select`
	${baseStyles}
`
