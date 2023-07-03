import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { handleResponse } from "../../_helpers";

export const getProductDetail = createAsyncThunk('productDetail/getProductDetail', async (id,{getState}) => {
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${getState().auth.user.token}`
        }
    }
    let response
    await axios.get(
        `/api/products/${id}/`, 
        config)
        .then( res => {response = res.data})
        .catch(err =>  {response = handleResponse(err)})
    return response && response
})

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        loading: false,
        product: {},
        error: null
    },
    reducers: {
        productDetailReset: (state) => {
            state.loading = false
            state.product = {}
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProductDetail.pending, (state)=>{
                state.loading = true
            }) 
            .addCase(getProductDetail.fulfilled, (state,action)=>{
                state.loading = false
                state.product = action.payload
                state.error = null
            })
            .addCase(getProductDetail.rejected, (state,action)=>{
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const productDetailReducer = productDetailSlice.reducer
export const { productDetailReset }  = productDetailSlice.actions