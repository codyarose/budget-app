import auth, {
	initialState,
	loginUser,
	selectIsAuthed,
	selectUid,
	logoutUser,
} from './authSlice'
import { initialState as initialFilterState } from '../filter/filterSlice'
import { initialState as initialExpensesState } from '../expenses/expensesSlice'

const rootState = {
	expenses: initialExpensesState,
	filter: initialFilterState,
	auth: initialState,
}

describe('auth reducer', () => {
	it('should log in', () => {
		const uid = 'testUid'
		const action = { type: loginUser.fulfilled.type, payload: uid }
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
