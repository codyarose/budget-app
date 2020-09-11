import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import {
	DateRangePicker,
	DateRangePickerShape,
	SingleDatePicker,
	SingleDatePickerShape,
} from 'react-dates'

export const StyledDateRangePicker: FC<DateRangePickerShape> = (props) => {
	return (
		<DateRangeWrapper>
			<DateRangePicker {...props} />
		</DateRangeWrapper>
	)
}

export const StyledSingleDatePicker: FC<SingleDatePickerShape> = (props) => {
	return (
		<SingleDateWrapper>
			<SingleDatePicker {...props} />
		</SingleDateWrapper>
	)
}
StyledSingleDatePicker.displayName = 'StyledSingleDatePicker'

const commonStyles = css`
	--background: ${({ theme }) => theme.colors.bg};
	--foreground: ${({ theme }) => theme.colors.fg};
	color: var(--foreground);
	transition: color 0.2s ease-in-out;

	.DayPicker__horizontal,
	.CalendarMonth,
	.CalendarMonthGrid {
		background: inherit;
	}
	.DateInput_input,
	.DayPicker_weekHeader,
	.CalendarMonth_caption {
		color: inherit;
	}
	.CalendarDay__default,
	.DayPickerNavigation_button__default {
		background: inherit;
		color: inherit;
	}

	.DateInput {
		height: 100%;
		background-color: transparent;
	}
	.DateInput_input {
		height: 100%;
		background-color: inherit;
		&__focused {
			border-color: var(--foreground);
		}
	}
	.DayPicker {
		&__withBorder {
			box-shadow: ${({ theme }) =>
				`0 2px 6px ${rgba(theme.colors.fg, 0.05)}, 0 0 0 1px ${rgba(
					theme.colors.fg,
					0.07,
				)}`};
		}
		&__horizontal {
		}
		&_weekHeader {
		}
	}
	.CalendarMonth,
	.CalendarMonthGrid {
	}
	.CalendarMonth_caption {
	}
	.CalendarDay {
		&__default {
		}
		&__selected {
			background: var(--foreground);
			border-color: var(--foreground);
			color: var(--background);
		}
		&__selected_span {
			background: ${({ theme }) => rgba(theme.colors.fg, 0.5)};
			border-color: ${({ theme }) => rgba(theme.colors.fg, 0.25)};
			color: var(--background);
			&:hover {
				background: ${({ theme }) => rgba(theme.colors.fg, 0.6)};
			}
		}
	}
	.DayPickerKeyboardShortcuts_show__bottomRight::before {
		border-right-color: var(--foreground);
	}
	.DayPickerKeyboardShortcuts_showSpan {
		color: var(--background);
	}
	.DayPickerNavigation_button__default {
		border: 1px solid ${({ theme }) => rgba(theme.colors.fg, 0.5)};
	}
	.DayPickerNavigation_svg__horizontal {
		fill: var(--foreground);
	}
`

const SingleDateWrapper = styled.div`
	.SingleDatePicker {
		width: 100%;
	}
	.SingleDatePickerInput {
		width: 100%;
		background-color: transparent;

		&__withBorder {
			border: none;
			border-bottom: 2px solid var(--foreground);
			transition: border-color 0.2s ease-in-out;
		}
	}
	${commonStyles}
	.DateInput {
		width: 100%;
	}
`

const DateRangeWrapper = styled.div`
	.DateRangePicker {
		height: 100%;
		& > div {
			height: 100%;
		}
		&_picker {
			background-color: var(--background);
		}
	}
	.DateRangePickerInput {
		height: 100%;
		background-color: transparent;
		&__withBorder {
			border: none;
			border-bottom: 2px solid var(--foreground);
			transition: border-color 0.2s ease-in-out;
		}
		&_arrow_svg,
		&_clearDates_svg {
			fill: var(--foreground);
			transition: fill 0.22s ease-in-out;
		}
	}

	${commonStyles}
`
