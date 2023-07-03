import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { handleResponse } from "../../_helpers";

export const listMyOrders = createAsyncThunk('myOrders/listMyOrders', async (_,{getState}) => {
    console.log( `/api/orders/myorders/`)
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${getState().auth.user.token}`
        }
    }
    let response
    await axios.get(
        `/api/orders/myorders/`, 
        config)
        .then( res => {response = res.data})
        .catch(err =>  {response = handleResponse(err)})
    return response && response
})

const myOrdersSlice = createSlice({
    name: 'myOrders',
    initialState: {
        loading: false,
        orders: [],
        error: {}
    },
    extraReducers(builder) {
        builder
            .addCase(listMyOrders.pending, (state)=>{
                state.loading = true
            }) 
            .addCase(listMyOrders.fulfilled, (state,action)=>{
                state.loading = false
                state.orders = action.payload
            })
            .addCase(listMyOrders.rejected, (state,action)=>{
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const myOrdersReducer = myOrdersSlice.reducer