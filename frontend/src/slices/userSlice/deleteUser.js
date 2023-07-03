import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleResponse } from '../../_helpers';

// create slice

const initialState = {
    loading: true,
    success: false,
    error: null
}

export const deleteUser = createAsyncThunk("deleteUser/deleteUser", async ( id, { getState }) => {
    const user = getState().auth.user
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    let response 
    await axios.delete(
        `/api/users/delete/${id}`, 
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response 
})


const deleteUserSlice = createSlice({
    name : 'deleteUser',
    initialState: initialState,
    extraReducers(builder) {
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false
                state.success = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const deleteUserReducer = deleteUserSlice.reducer

