import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk('cart/addToCart', async({id,qty}, {getState, dispatch}) => {
    const data = (await axios.get(`/api/products/${id}`)).data
    const newItem = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: Number(qty)
    }
    dispatch(cartSlice.actions.addToCart(newItem))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    return 
})


export const removeFromCart =  (id) => (dispatch,getState) => {
    dispatch(cartSlice.actions.removeFromCart(id))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    return 
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch(cartSlice.actions.saveShippingAddress(data))
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch(cartSlice.actions.savePaymentMethod(data))
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState:{

    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload
            console.log(newItem)
            const existingItemIndex = state.cartItems.findIndex(item => item.product === newItem.product)
            if (existingItemIndex !== -1) {
                state.cartItems[existingItemIndex] = newItem
            } else {
                state.cartItems = [...state.cartItems, newItem]
            }
        },

        removeFromCart: (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter(e => e.product !== id)
        },

        saveShippingAddress: (state,action) => {
            const data = action.payload
            state.shippingAddress = data
        },

        savePaymentMethod: (state,action) => {
            state.paymentMethod = action.payload
        }

    },

})

export const cartSliceReducer =  cartSlice.reducer