const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isDarkMode: false,
        user: null,
        token: null,
        posts: null,
        friends: []

    },
    reducers: {
        setMode: (state) => {
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
            state.posts = null
        },
        setPosts: (state,action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const newPosts = state.posts.map((post) => {
              if (post._id === action.payload.post._id) {
                return action.payload.post;
              }
              return post;
            });
            state.posts = newPosts
        },
        setFriends: (state,action) => {
            state.friends = action.payload.friends
        }
    }
})

export const userActions = userSlice.actions

export default userSlice