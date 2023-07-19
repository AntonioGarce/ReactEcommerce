import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { store } from '../../store';

import { handleResponse } from '../../_helpers';

// create slice

const initialState = {
    loading: true,
    user: null,
    error: null
}

export const updateUserProfile = createAsyncThunk("updateUserDetails/updateUserDetails", async ( new_user ) => {
    const user = store.getState().auth.user
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    console.log('/api/users/update')
    let response 
    await axios.put(
        `/api/users/profile/update`, 
        new_user,
        config)
        .then( res => {response = res.data})
        .catch(err =>  {response = handleResponse(err)})
    return response 
})


const getUserDetailsSlice = createSlice({
    name : 'getUserDetails',
    initialState: initialState,
    extraReducers(builder) {
        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false
                const user = action.payload;
                state.user = user;
                localStorage.setItem('user', JSON.stringify(user))
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const updateUserDetailsReducer = getUserDetailsSlice.reducer

