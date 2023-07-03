import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { history } from '../../_helpers';

import { userDetailReset } from './'

// implementation

const initialState = {
    user: JSON.parse(localStorage.getItem('user') ),
    error: null
}

export const login = createAsyncThunk("auth/login", async ( { email,  password} ) => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const response = await axios.post(
        '/api/users/login', 
        { 'username': email, 'email':email, 'password': password },
        config)
    return response?.data
})

const authSlice = createSlice({
    name : 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            console.log('logout')
            state.user = null;
            userDetailReset()
            localStorage.removeItem('user');
            // history.navigate('/login');
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action)
                state.loading = false
                const user = action.payload
                state.user = user
                localStorage.setItem('user', JSON.stringify(user))
                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.navigate(from);
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action)
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer

