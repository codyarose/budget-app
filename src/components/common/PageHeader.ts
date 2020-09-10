import styled from 'styled-components'

const PageHeader = styled.div`
	font-size: 1.5rem;
	font-weight: 300;
	padding: ${({ theme }) => `${theme.spacing.sm} 0`};
	& > * {
		font-size: inherit;
		font-weight: inherit;
		margin: 0;
	}
`

export default PageHeader
