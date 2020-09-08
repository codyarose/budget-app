import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { firebase, googleAuthProvider } from '../../firebase/firebase'
import { RootState } from '../../app/store'

export const loginUser = createAsyncThunk('auth/loginUser', async () => {
	try {
		await firebase.auth().signInWithPopup(googleAuthProvider)
	} catch (error) {
		console.log('Error', error)
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
}

export const initialState: AuthState = {
	isAuthed: false,
	isLoading: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(loginUser.fulfilled, (state) => {
			state.isAuthed = true
			state.isLoading = false
		})
		builder.addCase(loginUser.rejected, (state) => {
			state.isLoading = false
		})
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.isAuthed = false
		})
	},
})

export const selectIsAuthed = (state: RootState): boolean => state.auth.isAuthed

export default authSlice.reducer
