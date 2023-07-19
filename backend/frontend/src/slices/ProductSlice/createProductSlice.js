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

export const createProduct = createAsyncThunk("createProduct/createProduct", async ( _, { getState }) => {
    const user = getState().auth.user
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
        }
    }
    let response 
    await axios.post(
        `/api/products/create/`, 
        {},
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response && response
})

const createProductSlice = createSlice({
    name : 'createProduct',
    initialState: initialState,
    reducers: 
    {
        createProductReset: (state) => {
            state.loading = false
            state.product = {}
            state.success = false
            state.error = {}
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
                state.success = true
                state.error = {}
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
    }
})

export const { createProductReset } = createProductSlice.actions
export const createProductReducer = createProductSlice.reducer

