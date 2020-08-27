import React, { ReactElement } from 'react'

const EditExpensePage = ({
	match,
}: {
	match: {
		params: {
			id: string
		}
	}
}): ReactElement => {
	return <div>Editing expense with id of {match.params.id}</div>
}

export default EditExpensePage
