import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleResponse } from '../../_helpers';

// create slice
const initialState = {
    loading: true,
    success: false,
    error: null
}

export const uploadProductImage = createAsyncThunk("uploadProductImage/uploadProductImage", async ( {id, image}, { getState }) => {
    const user = getState().auth.user
    const formData = new FormData()
    formData.append('image', image)
    const config = {
        headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`
        }
    }
    let response 
    await axios.post(
        `/api/products/upload/${id}/`, 
        formData,
        config)
        .then( res=>(response = res.data)) 
        .catch( err =>  {response = handleResponse(err)} )
    return response && response
})

const uploadProductImageSlice = createSlice({
    name : 'updateProduct',
    initialState: initialState,
    reducers: 
    {
        uploadProductImageReset: (state) => {
            state.loading = false
            state.success = false
            state.error = {}
        },
    },
    extraReducers(builder) {
        builder
            .addCase(uploadProductImage.pending, (state) => {
                state.loading = true
            })
            .addCase(uploadProductImage.fulfilled, (state) => {
                state.loading = false
                state.success = true
                state.error = {}
            })
            .addCase(uploadProductImage.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
    }
})

export const { uploadProductImageReset } = uploadProductImageSlice.actions
export const uploadProductImageReducer = uploadProductImageSlice.reducer

