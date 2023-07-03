import { configureStore } from '@reduxjs/toolkit'

// import slice
import * as slices from './slices'

const initialState = {
  cart: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [],
    shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")) ?? {},
    paymentMethod: JSON.parse(localStorage.getItem("paymentMethod")) ?? {}
  },
};

export const store = configureStore({
    reducer: {
        productDetail: slices.productDetailReducer,
        cart: slices.cartSliceReducer,
        auth: slices.authReducer,
        register: slices.registerReducer,
        userDetail: slices.getUserDetailsReducer,
        updateUserDetail: slices.updateUserDetailsReducer,
        users: slices.getUsersReducer,
        deleteUser: slices.deleteUserReducer,
        updateUser: slices.updateUserReducer,

        createOrder: slices.createOrderReducer,
        orderDetail: slices.orderDetailReducer,
        payOrder: slices.payOrderReducer,
        myOrders: slices.myOrdersReducer,
        orderList: slices.orderListReducer,
        
        productList: slices.getProductsReducer,
        deleteProduct: slices.deleteProductReducer,
        createProduct:  slices.createProductReducer,
        updateProduct: slices.updateProductReducer,
        uploadProductImage: slices.uploadProductImageReducer,
    },
    preloadedState: initialState
});
