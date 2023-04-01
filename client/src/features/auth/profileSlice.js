 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import profileService from './profileService'
//get user in local storage
//const user = JSON.parse(localStorage.getItem('user'))
//const { user } = useSelector((state) => state.auth)

const initialState = {
    profile: null,
    profiles: null,
    isSuccess: false,
    isLoading: false,
    message: '',
}
// Create new profile
export const createProfile = createAsyncThunk(
  '/profile',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.createProfile(profileData, token)
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
// Edit Profile
export const editProfile = createAsyncThunk(
  '/editprofile',
  async (editData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.editProfile(editData, token)
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
//GET PROFILE
export const getProfile = createAsyncThunk(
    '/profile/',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await profileService.getProfile(token)
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
//GET ALL PROFILE
export const getAllProfiles = createAsyncThunk(
  '/profile/all',
  async (_, thunkAPI) => {
    try {
      return await profileService.getAllProfiles()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data) ||
        error.message ||
        error.toString()
        console.log(message);
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//add experience
export const addExperience = createAsyncThunk(
  '/experience',
  async (expData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.addExperience(expData,token)
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
//Add Education
export const addEducation = createAsyncThunk(
  '/education',
  async (eduData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.addEducation(eduData,token)
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
// DELETE Education
export const deleteEducation = createAsyncThunk(
  '/education/',
  async (expId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.deleteEducation(expId,token)
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

// DELETE Experince
export const deleteExperience = createAsyncThunk(
  '/experience/',
  async (eduId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.deleteExperience(eduId,token)
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

// DELETE Account
export const deleteAccount = createAsyncThunk(
  '/',
  async (_,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
        return await profileService.deleteAccount(token)
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
export const profileSlice = createSlice({
    name: 'profile',
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
        builder.addCase(getProfile.pending, (state) => {
          state.isLoading = true
          })
        builder.addCase(getProfile.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.profile = action.payload
        })
        builder.addCase(getProfile.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        //create user profile
        builder.addCase(createProfile.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
        })
        builder.addCase(createProfile.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.profile = action.payload
        })
        builder.addCase(createProfile.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        //edit user profile
        builder.addCase(editProfile.pending, (state) => {
          state.isLoading = true
        })
        builder.addCase(editProfile.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.profile = action.payload
        })
        builder.addCase(editProfile.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        //get all user profile
        builder.addCase(getAllProfiles.pending, (state) => {
          state.isLoading = true
          })
        builder.addCase(getAllProfiles.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.profiles = action.payload
        })
        builder.addCase(getAllProfiles.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        //add experience
        builder.addCase(addExperience.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
        })
        builder.addCase(addExperience.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.profile = action.payload
        })
        builder.addCase(addExperience.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        // delete education
        builder.addCase(deleteEducation.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
        })
        builder.addCase(deleteEducation.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.profile = action.payload 
        })
        builder.addCase(deleteEducation.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        // delete experience
        builder.addCase(deleteExperience.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
        })
        builder.addCase(deleteExperience.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.profile = action.payload 
        })
        builder.addCase(deleteExperience.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        // delete Account
        builder.addCase(deleteAccount.pending, (state) => {
          state.isLoading = true
          state.isSuccess = false
        })
        builder.addCase(deleteAccount.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.profile = action.payload 
        })
        builder.addCase(deleteAccount.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
    }
})

export const { reset } = profileSlice.actions
export default profileSlice.reducer