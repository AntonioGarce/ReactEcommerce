import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleResponse } from '../../_helpers';

// create slice

const initialState = {
    loading: true,
    products: [],
    error: null
}

export const getProducts = createAsyncThunk("getProducts/getProducts", async () => {
    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    let response 
    await axios.get(
        `/api/products/`, 
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response && response
})


const getProductsSlice = createSlice({
    name : 'getProducts',
    initialState: initialState,
    reducers:{
        getProductsReset: (state) => {
            state.loading = false
            state.products = []
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const getProductsReducer = getProductsSlice.reducer
export const { getProductsReset } = getProductsSlice.actions

