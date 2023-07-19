import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { handleResponse } from "../../_helpers";

export const getOrders = createAsyncThunk('getOrders/getOrders', async (_,{getState}) => {
    console.log( `/api/orders/`)
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${getState().auth.user.token}`
        }
    }
    let response
    await axios.get(
        `/api/orders/`, 
        config)
        .then( res => {response = res.data})
        .catch(err =>  {response = handleResponse(err)})
    return response && response
})

const orderListSlice = createSlice({
    name: 'getOrders',
    initialState: {
        loading: false,
        orders: [],
        error: {}
    },
    extraReducers(builder) {
        builder
            .addCase(getOrders.pending, (state)=>{
                state.loading = true
            }) 
            .addCase(getOrders.fulfilled, (state,action)=>{
                state.loading = false
                state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state,action)=>{
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const orderListReducer = orderListSlice.reducer