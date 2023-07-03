import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { handleResponse } from "../../_helpers";

export const createOrder = createAsyncThunk('createOrder/createOrder', async (data, {getState}) => {
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${getState().auth.user.token}`
        }
    }
    let response
    await axios.post(
        `/api/orders/add`, 
        data,
        config)
        .then( res => {response = res.data})
        .catch(err =>  {response = handleResponse(err)})
    return response && response
})

export const createOrderSlice = createSlice({
    name: 'createOrder',
    initialState: {
        loading: false,
        success: false,
        order: {},
        error: null
    },
    reducers: {
        createOrderReset: (state) => {
            state.success = false
            state.error = null
            state.order = {}
            state.loading = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createOrder.pending, (state)=>{
                state.loading = true
            })
            .addCase(createOrder.fulfilled, (state,action)=>{
                state.loading = false
                state.success = true
                state.order = action.payload
            })
            .addCase(createOrder.rejected, (state,action)=>{
                state.loading = false
                state.success = false
                state.error = action.error.message
            })

    }
})

export const createOrderReducer = createOrderSlice.reducer
export const { createOrderReset } = createOrderSlice.actions
