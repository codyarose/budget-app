import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
	error: boolean
	helperText: string
}

const Error: FC<Props> = ({ error, helperText }) => {
	return <>{error && <StyledError>{helperText}</StyledError>}</>
}

export default Error

const StyledError = styled.div`
	font-style: italic;
`
