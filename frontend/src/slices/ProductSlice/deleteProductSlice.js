import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleResponse } from '../../_helpers';

// create slice

const initialState = {
    loading: true,
    success: false,
    error: null
}

export const deleteProduct = createAsyncThunk("deleteProduct/deleteProduct", async ( id, { getState }) => {
    const user = getState().auth.user
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    let response 
    await axios.delete(
        `/api/products/delete/${id}`, 
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response && response
})

const deleteProductSlice = createSlice({
    name : 'deleteProduct',
    initialState: initialState,
    reducers: 
    {
        deleteProductReset: (state) => {
            state.loading = false
            state.success = false
            state.error = {}
        },
    },
    extraReducers(builder) {
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loading = false
                state.success = true;
                state.error = {}
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { deleteProductReset } = deleteProductSlice.actions
export const deleteProductReducer = deleteProductSlice.reducer

