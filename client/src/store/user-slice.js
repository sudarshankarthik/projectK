const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isDarkMode: true,
        user: null,
        token: null,
        posts: []

    },
    reducers: {
        setMode: (state) => {
            alert(state.isDarkMode)
            state.isDarkMode = !state.isDarkMode 
        },
        login: (state,action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null
            state.token = null
        }
    }
})

export const userActions = userSlice.actions

export default userSlice