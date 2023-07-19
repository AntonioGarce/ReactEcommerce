import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { handleResponse } from "../../_helpers";

export const payOrder = createAsyncThunk('payOrder/payOrder', async ({id,paymentResult},{getState}) => {
    console.log('payorder')
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${getState().auth.user.token}`
        }
    }
    let response
    await axios.put(
        `/api/orders/${id}/pay/`, 
        paymentResult,
        config)
        .then( res => {response = res.data})
        .catch(err =>  {response = handleResponse(err)})
    return response?.data
})

const payOrderSlice = createSlice({
    name: 'payOrder',
    initialState: {
        loading: false,
        success: false,
        error: {}
    },
    reducers:{
        payOrderReset: (state) => {
            state.loading = false
            state.success = false
            state.error = {}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(payOrder.pending, (state)=>{
                state.loading = true
            }) 
            .addCase(payOrder.fulfilled, (state)=>{
                state.loading = false
                state.success = true
            })
            .addCase(payOrder.rejected, (state,action)=>{
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { payOrderReset } = payOrderSlice.actions
export const payOrderReducer = payOrderSlice.reducer