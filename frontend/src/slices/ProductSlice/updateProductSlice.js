import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleResponse } from '../../_helpers';

// create slice
const initialState = {
    loading: true,
    success: false,
    product: {},
    error: null
}

export const updateProduct = createAsyncThunk("updateProduct/updateProduct", async ( {id,productInfo}, { getState }) => {
    const user = getState().auth.user
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    let response 
    await axios.put(
        `/api/products/update/${id}/`, 
        productInfo,
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response && response
})

const updateProductSlice = createSlice({
    name : 'updateProduct',
    initialState: initialState,
    reducers: 
    {
        updateProductReset: (state) => {
            state.loading = false
            state.success = false
            state.error = {}
        },
    },
    extraReducers(builder) {
        builder
            .addCase(updateProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.loading = false
                state.success = true
                state.error = {}
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
    }
})

export const { updateProductReset } = updateProductSlice.actions
export const updateProductReducer = updateProductSlice.reducer

