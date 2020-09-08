import { createSlice } from '@reduxjs/toolkit'

import { firebase, googleAuthProvider } from '../../firebase/firebase'

const login = () => {
	firebase.auth().signInWithPopup(googleAuthProvider)
}

const logout = () => {
	firebase.auth().signOut()
}

export const initialState = []

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginUser: login,
		logoutUser: logout,
	},
})

export const { loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer
