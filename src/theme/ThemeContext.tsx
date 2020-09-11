import React, { createContext, useContext, FC, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import themeOptions from './index'
import { GlobalStyles } from './globalStyles'

interface ThemeState {
	theme: unknown
	selectedTheme: string
}

const stringLitArray = <L extends string>(arr: L[]) => arr
const themeNames = stringLitArray(['light', 'dark'])
type ThemeName = typeof themeNames[number]
const isThemeName = (x: any): x is ThemeName => themeNames.includes(x)

interface InitialState extends ThemeState {
	updateTheme: (theme: string) => void
}

export const ThemeContext = createContext<Partial<InitialState>>({})

export const ThemeProvider: FC = ({ children }) => {
	const storedTheme = localStorage.getItem('theme')
	const getTheme = () => {
		if (storedTheme && isThemeName(storedTheme)) {
			return storedTheme
		} else {
			return 'light'
		}
	}

	const initialTheme = getTheme()
	const [selectedTheme, setSelectedTheme] = useState(initialTheme)
	const [theme, setTheme] = useState(themeOptions[selectedTheme])

	const updateTheme = (theme: string) => {
		if (isThemeName(theme)) {
			setSelectedTheme(theme)
			setTheme(themeOptions[theme])
			localStorage.setItem('theme', theme)
		}
	}
	return (
		<ThemeContext.Provider
			value={{
				theme,
				selectedTheme,
				updateTheme,
			}}
		>
			<StyledThemeProvider theme={theme}>
				<GlobalStyles />

				{children}
			</StyledThemeProvider>
		</ThemeContext.Provider>
	)
}

export const useThemeValue = (): Partial<InitialState> =>
	useContext(ThemeContext)
