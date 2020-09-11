const spacing = {
	xs: '0.5rem',
	sm: '1rem',
	md: '2rem',
	lg: '3rem',
	xl: '4rem',
}

const breakpoint = {
	xs: 'screen and (max-width: 450px)',
	sm: 'screen and (max-width: 600px)',
	md: 'screen and (max-width: 1024px)',
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
		breakpoint: {
			...breakpoint,
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
		breakpoint: {
			...breakpoint,
		},
	},
} as const

export type ThemeType = typeof themeOptions.light

export default themeOptions
