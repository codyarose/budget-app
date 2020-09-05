import React, { FC } from 'react'
import numeral from 'numeral'

interface Props {
	count: number
	total: number
}

const ExpenseTotal: FC<Props> = ({ count, total }) => {
	const expensePlural = count === 1 ? 'expense' : 'expenses'
	const formattedTotal = numeral(total / 100).format('$0,0.00')
	return (
		<>
			{!!count && (
				<div>
					Showing {count} {expensePlural} totalling {formattedTotal}
				</div>
			)}
		</>
	)
}

export default ExpenseTotal
