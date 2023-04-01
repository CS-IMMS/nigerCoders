import { configureStore, createSlice } from '@reduxjs/toolkit'
//import authReducer from './reducers/authReducer'

const TEST_DISPATCH = 'TEST_DISPATCH'
const registerUser = createSlice({
    name: 'userRegister',
    initialState:{
        isAuthenticated: false,
        user: {}
    },
    reducers: {
        authReducer: (state, action) =>{
            switch(action.type){
                case TEST_DISPATCH:
                    return {
                        ...state,
                        user: action.payload
                    }
                default:
                    return state; 
            }
    }
}
});
 

export const store = configureStore({
    reducer: {
        user: registerUser.reducer
    }
})