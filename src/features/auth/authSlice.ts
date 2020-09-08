import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { firebase, googleAuthProvider } from '../../firebase/firebase'
import { RootState } from '../../app/store'

export const loginUser = createAsyncThunk('auth/loginUser', async () => {
	try {
		const login = await firebase.auth().signInWithPopup(googleAuthProvider)
		return login.user?.uid
	} catch (error) {
		console.log(error)
	}
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	try {
		await firebase.auth().signOut()
	} catch (error) {
		console.log('Error', error)
	}
})

export interface AuthState {
	isAuthed: boolean
	isLoading: boolean
	uid: string
}

export const initialState: AuthState = {
	isAuthed: false,
	isLoading: false,
	uid: '',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isAuthed = true
			state.isLoading = false
			const uid = action.payload || ''
			state.uid = uid
		})
		builder.addCase(loginUser.rejected, (state) => {
			state.isLoading = false
		})
		builder.addCase(logoutUser.fulfilled, () => {
			return initialState
		})
	},
})

export const selectIsAuthed = (state: RootState): boolean => state.auth.isAuthed
export const selectUid = (state: RootState): string => state.auth.uid

export default authSlice.reducer
