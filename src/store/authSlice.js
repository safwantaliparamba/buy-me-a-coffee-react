import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: localStorage.getItem("name") ?? null,
    email: localStorage.getItem("email") ?? null,
    isAuthenticated: localStorage.getItem("isAuthenticated") ?? false,
    refreshToken: localStorage.getItem("refreshToken") ?? null,
    accessToken: localStorage.getItem("accessToken") ?? null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            const { email, name, access, refresh } = payload

            state.name = name
            state.email = email
            state.accessToken = access
            state.refreshToken = refresh
            state.isAuthenticated = true

            localStorage.setItem("name", name)
            localStorage.setItem("email", email)
            localStorage.setItem("accessToken", access)
            localStorage.setItem("refreshToken", refresh)
            localStorage.setItem("isAuthenticated", true)
        },
        logout: (state) => {
            state.isAuthenticated = false

            localStorage.clear()
        }
    }
})

export default authSlice.reducer

export const { login, logout } = authSlice.actions 