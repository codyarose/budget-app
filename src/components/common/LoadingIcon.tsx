import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
	width?: number
}

const LoadingIcon: FC<Props> = ({ width = 150 }) => (
	<StyledIcon
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		width={width}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1}
			d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</StyledIcon>
)

export default LoadingIcon

const StyledIcon = styled.svg`
	animation: spin 2s linear infinite;
	stroke: ${({ theme }) => theme.colors.fg};
	transition: stroke 0.2s ease-in-out;
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`
