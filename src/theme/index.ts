const spacing = {
	xs: '0.5rem',
	sm: '1rem',
	md: '2rem',
	lg: '3rem',
	xl: '4rem',
}

const themeOptions = {
	light: {
		colors: {
			fg: '#000',
			bg: '#fff',
		},
		spacing: {
			...spacing,
		},
	},
	dark: {
		colors: {
			fg: '#fff',
			bg: '#000',
		},
		spacing: {
			...spacing,
		},
	},
} as const

export type ThemeType = typeof themeOptions.light

export default themeOptions
