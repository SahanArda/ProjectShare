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
  reducers: { // Reducers are actions that change the initial state
    // Action creator to toggle between "light" and "dark" modes
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Action creator to set user and authentication token on login
    setLogIn: (state, action) => { // Action contains all the arguments / parameters
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Action creator to reset user and token to null on logout
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
    },
    // Action creator to set friends for the user (if user exists)
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends; // Here if the user exists, we set the friends array in the user object
      } else {
        console.error("user friends non-existent"); // If the user does not exist, we log an error
      }
    },
    // Action creator to set the posts array in the state
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Action creator to update a specific post in the posts array
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => { // We map through each post in the posts array 
        if (post._id === action.payload.post._id) return action.payload.post; // If the post id matches the id of the post we want to update, we return the updated post
        return post; 
      });
      state.posts = updatedPosts;
    },
  },
});

// Exporting individual action creators
// These are the action creators we defined above
export const { setMode, setLogIn, setLogOut, setFriends, setPosts, setPost } =
  authSlice.actions;

// Exporting the reducer function
export default authSlice.reducer;
