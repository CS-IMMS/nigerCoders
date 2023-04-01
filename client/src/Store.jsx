import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'
import profileSlice from "./features/auth/profileSlice"
import postSlice from "./features/post/postSlice"
const store = configureStore({
    reducer:{
        auth: authReducer,
        profile: profileSlice,
        profiles: profileSlice,
        posts: postSlice
    }
})
export default store