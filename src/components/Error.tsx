import React, { FC } from 'react'

interface Props {
	error: boolean
	helperText: string
}

const Error: FC<Props> = ({ error, helperText }) => {
	return <>{error && <div>{helperText}</div>}</>
}

export default Error
