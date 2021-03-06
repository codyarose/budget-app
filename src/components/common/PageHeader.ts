import styled from 'styled-components'

const PageHeader = styled.div`
	font-size: 1.5rem;
	font-weight: 300;
	color: ${({ theme }) => theme.colors.fg};
	padding: ${({ theme }) => `${theme.spacing.sm} 0`};
	transition: color 0.2s ease-in-out;
	& > * {
		font-size: inherit;
		font-weight: inherit;
		margin: 0;
	}
`

export default PageHeader
