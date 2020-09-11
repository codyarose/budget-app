import 'styled-components'
import { ThemeType } from './theme'

declare module 'styled-components' {
	export type DefaultTheme = ThemeType
}
