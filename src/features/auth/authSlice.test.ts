import auth, {
	initialState,
	selectIsAuthed,
	selectUid,
	logoutUser,
	setUser,
} from './authSlice'
import { initialState as initialFilterState } from '../filter/filterSlice'
import { initialState as initialExpensesState } from '../expenses/expensesSlice'

const rootState = {
	expenses: initialExpensesState,
	filter: initialFilterState,
	auth: initialState,
}

describe('authSlice', () => {
	it('should log in', () => {
		const uid = 'testUid'
		const payload = { displayName: 'name', uid }
		const action = { type: setUser.type, payload }
		const nextState = auth(initialState, action)

		rootState.auth = nextState
		expect(selectIsAuthed(rootState)).toEqual(true)
		expect(selectUid(rootState)).toEqual(uid)
	})

	it('should log out', () => {
		const action = { type: logoutUser.fulfilled.type }
		const nextState = auth(initialState, action)

		rootState.auth = nextState
		expect(selectIsAuthed(rootState)).toEqual(false)
		expect(selectUid(rootState)).toEqual('')
	})
})
