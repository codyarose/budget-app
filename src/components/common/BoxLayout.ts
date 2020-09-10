import styled from 'styled-components'

const Layout = styled.div`
	background: ${({ theme }) => theme.colors.white};
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Box = styled.div`
	position: relative;
	background-color: ${({ theme }) => theme.colors.white};
	border: 3px solid ${({ theme }) => theme.colors.black};
	text-align: center;
	padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
	box-shadow: ${({ theme }) =>
		`${theme.spacing.xs} ${theme.spacing.xs} 0 currentColor`};
`

const BoxLayout = {
	Layout,
	Box,
}

export default BoxLayout
