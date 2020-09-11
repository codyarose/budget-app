import { createGlobalStyle } from 'styled-components'
import { ThemeType } from '.'

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
	html {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
		box-sizing: border-box;
	}
	*, *::before, *::after {
		box-sizing: inherit;
	}
	body {
		margin: 0;
		background: ${({ theme }) => theme.colors.bg};
		transition: background-color 0.2s ease-in-out;
	}
	.hide-for-mobile {
		@media screen and (max-width: 600px) {
			display: none;
		}
	}
	.show-for-mobile {
		@media screen and (min-width: 601px) {
			display: none;
		}
	}
`
