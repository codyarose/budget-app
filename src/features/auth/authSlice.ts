import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { firebase, googleAuthProvider } from '../../firebase/firebase'
import { RootState } from '../../app/store'

export const loginUser = createAsyncThunk('auth/loginUser', async () => {
	try {
		const login = await firebase.auth().signInWithPopup(googleAuthProvider)
		const user = login.user
		if (user) {
			const { uid, displayName } = user
			const authUser = { uid, displayName }
			localStorage.setItem('authUser', JSON.stringify(authUser))
			return authUser
		}
	} catch (error) {
		console.log(error)
	}
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
	try {
		await firebase.auth().signOut()
		localStorage.removeItem('authUser')
	} catch (error) {
		console.log('Error', error)
	}
})

interface User {
	uid: string
	displayName: string | null
}

export interface AuthState {
	isAuthed: boolean
	isLoading: boolean
	user: User
}

export const initialState: AuthState = {
	isAuthed: false,
	isLoading: false,
	user: {
		uid: '',
		displayName: '',
	},
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
			state.isAuthed = true
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isAuthed = true
			state.isLoading = false
			state.user = {
				...state.user,
				uid: action.payload ? action.payload.uid : '',
				displayName: action.payload ? action.payload.displayName : '',
			}
		})
		builder.addCase(loginUser.rejected, (state) => {
			state.isLoading = false
		})
		builder.addCase(logoutUser.fulfilled, () => {
			return initialState
		})
	},
})

export const { setUser } = authSlice.actions

export const selectIsAuthed = (state: RootState): boolean => state.auth.isAuthed
export const selectUid = (state: RootState): string => state.auth.user.uid

export default authSlice.reducer
