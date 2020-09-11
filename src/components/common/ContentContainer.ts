import styled from 'styled-components'

const ContentContainer = styled.div<{ padBottom?: boolean }>`
	width: 100%;
	max-width: 64rem;
	margin: 0 auto;
	padding: ${({ theme }) => `0 ${theme.spacing.md}`};
	${(props) =>
		props.padBottom && `padding-bottom: ${props.theme.spacing.lg};`}
`

export default ContentContainer
