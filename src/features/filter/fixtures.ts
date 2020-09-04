import moment from 'moment'

const filters = {
	text: '',
	sortBy: 'date',
	startDate: moment(0),
	endDate: moment(0).add(3, 'days'),
}

const altFilters = {
	text: 'bills',
	sortBy: 'amount',
	startDate: moment(0),
	endDate: moment(0).add(10, 'days'),
}

export { filters, altFilters }
