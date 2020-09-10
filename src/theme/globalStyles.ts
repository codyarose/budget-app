import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
	html {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
		box-sizing: border-box;
	}
	*, *::before, *::after {
		box-sizing: inherit;
	}
	body {
		margin: 0;
		background: #fff;
	}
`
