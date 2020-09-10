import styled from 'styled-components'

const ContentContainer = styled.div`
	width: 100%;
	max-width: 64rem;
	margin: 0 auto;
	padding: ${({ theme }) => `0 ${theme.spacing.md}`};
`

export default ContentContainer
