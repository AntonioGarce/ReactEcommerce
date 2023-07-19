import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

// import history for naviagation
import { history } from './_helpers'

import './scss/style.scss'

// import components
import { PrivateRoute } from './components/PrivateRoute' 
import { ProtectedRoute } from './components/ProtectedRoute'

// import pages 
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen' 
import CartScreen from './screens/CartScreen'
// import LoginScreen from './screens/LoginScreen'
import LoginScreenMui from './screens/LoginScreenMui'
import RegisterScreenMui from './screens/registerScreen'
// import LoginScreenBt from './screens/LoginScreenBt'
import ShippingScreen from './screens/ShippingScreen'
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ErrorScreen from './screens/ErrorScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'

function App() {

  history.navigate = useNavigate();
  history.location = useLocation();
  
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute>
                      <UserListScreen />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/user/:id/edit"
                element={
                    <ProtectedRoute>
                      <UserEditScreen />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/products/"
                element={
                    <ProtectedRoute>
                      <ProductListScreen />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/product/:id/edit"
                element={
                    <ProtectedRoute>
                      <ProductEditScreen />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/orders"
                element={
                    <ProtectedRoute>
                      <OrderListScreen />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/shipping"
                element={
                    <PrivateRoute>
                      <ShippingScreen />
                    </PrivateRoute>
                }
            />
            <Route
                path="/payment"
                element={
                    <PrivateRoute>
                      <PaymentScreen />
                    </PrivateRoute>
                }
            />
            <Route
                path="/placeorder"
                element={
                    <PrivateRoute>
                        <PlaceOrderScreen />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <ProfileScreen />
                    </PrivateRoute>
                }
            />
            <Route 
                path = "/order/:id"
                element={
                    <PrivateRoute>
                      <OrderScreen />
                    </PrivateRoute>
                }
            />
            <Route path='/login' Component={LoginScreenMui} />
            <Route path='/register' Component={RegisterScreenMui}/>
            <Route path='/' Component={HomeScreen} exact />
            <Route path='/product/:id' Component={ProductScreen} />
            <Route path='/cart/:id?' Component={CartScreen} />
            <Route path='/error/:message' Component={ErrorScreen} />
          </Routes>
        </Container>
      </main>
      <Footer/>

    </>
     
  );
}

export default App;
