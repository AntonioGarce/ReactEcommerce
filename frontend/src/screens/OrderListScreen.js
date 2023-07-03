import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import actions
import { getOrders } from '../slices'

// import helper function
import { history } from '../_helpers'

// import custom components
import OrderTable from '../components/OrderTable'

function OrderListScreen() {

  const dispatch = useDispatch()
  const { user } = useSelector(state=>state.auth)
  const { loading, orders, error } = useSelector(state=>state.orderList)

  useEffect(()=>{
    if(!user || !user.isAdmin){
        history.navigate('/login')
    } else if (orders.length === 0){
        dispatch(getOrders())
    } 
    dispatch(getOrders)
  },[dispatch,orders,user])
  return (
    <>
      <h1>OrderList</h1>
      <OrderTable/>
    </>
  )
}

export default OrderListScreen