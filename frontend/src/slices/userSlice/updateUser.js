import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleResponse } from '../../_helpers';

// create slice
const initialState = {
    loading: true,
    user: {},
    success: false,
    error: {}
}

export const updateUser = createAsyncThunk("updateUser/updateUser", async ( {id, name, email, isAdmin}, { getState }) => {
    const user = getState().auth.user
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    const data = {
        'name': name,
        'email': email,
        'isAdmin': isAdmin
    }
    let response 
    await axios.put(
        `/api/users/update/${id}`,
        data, 
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response 
})


const updateUserSlice = createSlice({
    name : 'updateUser',
    initialState: initialState,
    reducers: {
        updateUserReset: (state) => {
            state.success = false
            state.loading = true
            state.user = {}
            state.error = {}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload;
                state.success = true
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.success = false
            })
    }
})

export const updateUserReducer = updateUserSlice.reducer
export const { updateUserReset } = updateUserSlice.actions

