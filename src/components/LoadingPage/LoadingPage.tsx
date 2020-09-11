import React, { FC } from 'react'
import styled from 'styled-components'

import LoadingIcon from '../common/LoadingIcon'

const LoadingPage: FC = () => {
	return (
		<Wrapper>
			<LoadingIcon />
		</Wrapper>
	)
}

export default LoadingPage

const Wrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	text-align: center;
`
