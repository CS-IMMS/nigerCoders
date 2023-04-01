import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postServise from "./postService";

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

//add post

export const addPost = createAsyncThunk(
  '/posts',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postServise.addPost(postData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//Get ALL POSTS
export const getAllPosts = createAsyncThunk(
  '/posts/',
  async (_, thunkAPI) => {
    try {
      return await postServise.getAllPosts()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
      //console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// DELETE POST
export const deletePost = createAsyncThunk(
  '/posts/delete',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postServise.deletePost(postId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// ADD LIKES
export const addLikes = createAsyncThunk(
  '/posts/like/',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postServise.addLikes(postId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//DELETE LIKES
export const unlikes = createAsyncThunk(
  '/posts/unlike/',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postServise.unLikes(postId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//GET A SINGLE POST
export const getpost = createAsyncThunk(
  '/posts/id',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postServise.getpost(postId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// ADD COMMENT
export const addComment = createAsyncThunk(
  '/comment',
  async ({ postId, commentData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postServise.addComment(postId, commentData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Delete comment
export const deleteComment = createAsyncThunk(
  '/comment/postId/commentId',
  async ({ postId, commentId }, thunkAPI) => {
    console.log()
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postServise.deleteComment(postId, commentId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    //get user profile
    builder.addCase(addPost.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.post = action.payload
    })
    builder.addCase(addPost.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    //GET ALL POSTS
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.posts = action.payload
    })
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    // DELETE POST
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.post = action.payload
    })
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    // add like
    builder.addCase(addLikes.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addLikes.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.post = action.payload
    })
    builder.addCase(addLikes.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    // DELETE LIKES
    builder.addCase(unlikes.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(unlikes.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.post = action.payload
    })
    builder.addCase(unlikes.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    // GET A SINGLE POST
    builder.addCase(getpost.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getpost.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.post = action.payload
    })
    builder.addCase(getpost.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    // ADD COMMENT
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.posts = action.payload
    })
    builder.addCase(addComment.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    //DELETE COMMENT
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.posts = action.payload
    })
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  }
})
export const { reset } = postSlice.actions
export default postSlice.reducer