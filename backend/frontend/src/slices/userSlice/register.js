import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { history } from '../../_helpers';

// create slice

const initialState = {
    loading: false,
    user: null,
    error: null
}

export const registerUser = createAsyncThunk("register/register", async ( {username, email,  password} ) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const response = await axios.post(
        '/api/users/register', 
        { 'name': username, 'email':email, 'password': password },
        config)
    return response?.data
})


const registerSlice = createSlice({
    name : 'register',
    initialState: initialState,
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false

                const user = action.payload;
                
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                state.user = user;

                // get return url from location state or default to home page
                history.navigate('/login');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const registerReducer = registerSlice.reducer
