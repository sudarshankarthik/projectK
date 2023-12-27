const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isDarkMode: true,
        user: null,
        token: null,
        posts: [],
        friends: []

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
        setUser: (state,action) => {
            state.user = action.payload.user
        },
        logout: (state) => {
            state.user = null
            state.token = null
        },
        setPosts: (state,action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            state.posts = state.posts.map((post) => {
              if (post._id === action.payload.post._id) {
                return action.payload.post;
              }
              return post;
            });
        },
        setFriends: (state,action) => {
            state.friends = action.payload.friends
        }
    }
})

export const userActions = userSlice.actions

export default userSlice