import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { handleResponse } from "../../_helpers";

export const getOrder = createAsyncThunk('orderDetail/getOrder', async (id,{getState}) => {
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${getState().auth.user.token}`
        }
    }
    let response
    await axios.get(
        `/api/orders/${id}`, 
        config)
        .then( res => {response = res.data})
        .catch(err =>  {response = handleResponse(err)})
    return response
})

const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        loading: false,
        success: false,
        order: {},
        error: null
    },
    extraReducers(builder) {
        builder
            .addCase(getOrder.pending, (state)=>{
                state.loading = true
            }) 
            .addCase(getOrder.fulfilled, (state,action)=>{
                state.loading = false
                state.order = action.payload
                state.success = true
            })
            .addCase(getOrder.rejected, (state,action)=>{
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const orderDetailReducer = orderDetailSlice.reducer