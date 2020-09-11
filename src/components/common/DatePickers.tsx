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
	.DateInput {
		height: 100%;
	}
	.DateInput_input {
		height: 100%;
		&__focused {
			border-color: ${({ theme }) => theme.colors.black};
		}
	}
	.CalendarDay {
		&__selected {
			background: ${({ theme }) => theme.colors.black};
			border-color: ${({ theme }) => theme.colors.black};
		}
		&__selected_span {
			background: ${({ theme }) => rgba(theme.colors.black, 0.5)};
			border-color: ${({ theme }) => rgba(theme.colors.black, 0.25)};
			&:hover {
				background: ${({ theme }) => rgba(theme.colors.black, 0.6)};
			}
		}
	}
	.DayPickerKeyboardShortcuts_show__bottomRight::before {
		border-right-color: ${({ theme }) => theme.colors.black};
	}
`

const SingleDateWrapper = styled.div`
	.SingleDatePicker {
		width: 100%;
	}
	.SingleDatePickerInput {
		width: 100%;
		&__withBorder {
			border: none;
			border-bottom: 2px solid ${({ theme }) => theme.colors.black};
		}
	}
	${commonStyles}
`

const DateRangeWrapper = styled.div`
	.DateRangePicker {
		height: 100%;
		& > div {
			height: 100%;
		}
	}
	.DateRangePickerInput {
		height: 100%;
		&__withBorder {
			border: none;
			border-bottom: 2px solid ${({ theme }) => theme.colors.black};
		}
	}

	${commonStyles}
`
