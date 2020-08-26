import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
	id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

const EditExpensePage: FC<Props> = (props) => {
	console.log(props)
	return <div>Editing expense with id of {props.match.params.id}</div>
}

export default EditExpensePage
