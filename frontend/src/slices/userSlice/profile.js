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

export const getUserDetails = createAsyncThunk("getUserDetails/getUserDetails", async ( id ) => {
    const user = store.getState().auth.user
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    console.log(`/api/users/${id}`)
    let response 
    await axios.get(
        `/api/users/${id}`, 
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response && response
})


const getUserDetailsSlice = createSlice({
    name : 'getUserDetails',
    initialState: initialState,
    reducers: {
        userDetailReset: (state)=>{
            state.user = {}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                // console.log(action)
                state.loading = false
                const user = action.payload;
                state.user = user;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const getUserDetailsReducer = getUserDetailsSlice.reducer
export const { userDetailReset } = getUserDetailsSlice.actions
