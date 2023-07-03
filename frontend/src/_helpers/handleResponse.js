import { logout } from '../slices/userSlice'
import {store} from '../store'

export const handleResponse = (err) => {
    const response = err.response
    // const data = response.data
    console.log(err)
    // console.log([401, 403].includes(response.status) && authToken())
    if ([401, 403].includes(response.status) && authToken()) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        store.dispatch(logout())
    } 
    if (response.status===400) {
        err.message = response.data.detail
    }
    return Promise.reject(err);
}

function authToken() {
    return store.getState().auth.user?.token;
}

