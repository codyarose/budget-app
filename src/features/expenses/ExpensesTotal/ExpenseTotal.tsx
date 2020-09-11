import React, { FC } from 'react'
import numeral from 'numeral'
import styled from 'styled-components'

import PageHeader from '../../../components/common/PageHeader'

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
				<StyledPageHeader>
					Showing <span>{count}</span> {expensePlural} totalling{' '}
					<span>{formattedTotal}</span>
				</StyledPageHeader>
			)}
		</>
	)
}

export default ExpenseTotal

const StyledPageHeader = styled(PageHeader)`
	@media ${({ theme }) => theme.breakpoint.xs} {
		text-align: center;
	}
	span {
		font-weight: 500;
	}
`
