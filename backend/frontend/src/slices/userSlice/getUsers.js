import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleResponse } from '../../_helpers';

// create slice

const initialState = {
    loading: true,
    users: [],
    error: null
}

export const getUsers = createAsyncThunk("getUsers/getUsers", async ( _, { getState }) => {
    const user = getState().auth.user
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    let response 
    await axios.get(
        `/api/users/`, 
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response 
})


const getUsersSlice = createSlice({
    name : 'getUsers',
    initialState: initialState,
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const getUsersReducer = getUsersSlice.reducer

