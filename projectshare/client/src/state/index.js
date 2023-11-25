// Importing createSlice function from @reduxjs/toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the authentication slice
const initialState = {
  mode: "light", // Default mode is "light"
  user: null, // No user initially
  token: null, // No authentication token initially
  posts: [], // Empty array for posts
};

// Creating the authSlice using createSlice
export const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state is defined above
  reducers: {
    // Action creator to toggle between "light" and "dark" modes
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Action creator to set user and authentication token on login
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Action creator to reset user and token to null on logout
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Action creator to set friends for the user (if user exists)
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent");
      }
    },
    // Action creator to set the posts array in the state
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Action creator to update a specific post in the posts array
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Exporting individual action creators
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

// Exporting the reducer function
export default authSlice.reducer;
