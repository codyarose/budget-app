import styled, { css } from 'styled-components'
import { transitions } from 'polished'
const baseStyles = css`
	background-color: transparent;
	color: ${({ theme }) => theme.colors.fg};
	font-size: 1rem;
	border: none;
	border-bottom: 2px solid currentColor;
	padding: ${({ theme }) => `${theme.spacing.sm}`};
	${transitions(['color', 'border-color'], '0.2s ease-in-out')}
`

export const TextInput = styled.input`
	${baseStyles}
	&::placeholder {
		color: ${({ theme }) => theme.colors.fg};
		transition: color 0.2s ease-in-out;
	}
`

export const SelectInput = styled.select`
	${baseStyles}
`
