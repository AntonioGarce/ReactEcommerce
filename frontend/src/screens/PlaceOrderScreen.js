import React, { useEffect } from 'react'
import { Row,Col, ListGroup, Button, Image } from 'react-bootstrap'

// import redux state
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

// import custom components 
import CheckOutSteps from '../components/CheckOutSteps'
import AlertMessage from '../components/AlertMessage'

// import actions
import { createOrder, createOrderReset } from '../slices/orderSlice'

// import history
import { history } from '../_helpers'

function PlaceOrderScreen() {
  
  const { cartItems, shippingAddress, paymentMethod }  = useSelector(state=>state.cart)
  const itemsPrice = cartItems.reduce((acc,item)=> acc=acc+item.price*item.qty, 0)
  const shippingPrice = (itemsPrice>100 ? 10:0).toFixed(2)
  const taxPrice = (0.082*itemsPrice).toFixed(2)
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  const dispatch = useDispatch()
  const { success, order,  error } = useSelector(state=>state.createOrder)

  useEffect(()=>{
    if (success ) {
        history.navigate(`/order/${order._id}`)
        dispatch(createOrderReset())
    }
  },[success, order, dispatch])

  const placeOrder = () => {
    dispatch(createOrder({paymentMethod,shippingPrice,itemsPrice,taxPrice,totalPrice,shippingAddress,orderItems:cartItems}))
  }

  return (
    <div>
        <CheckOutSteps step={4} />
        <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h1> SHIPPING</h1>
                        <strong>Address: {shippingAddress.address}. {shippingAddress.city},{shippingAddress.postalCode}, {shippingAddress.country}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h1>PAYMNET METHOD</h1>
                        <strong>Method: {paymentMethod}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h1>ORDER ITEMS</h1>
                        {!cartItems.length === 0
                            ?   <AlertMessage>Cart is empty.</AlertMessage>
                            :   <ListGroup>
                                    {cartItems.map((item,i)=>(
                                        <Row key={i}>
                                            <Col md={2}>
                                                <LinkContainer to={`/product/${item.product}`}>
                                                    <Image src={item.image} alt={item.product} fluid rounded></Image>
                                                </LinkContainer>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col>
                                                {`${item.qty}*$${item.price}=$${(item.qty*item.price).toFixed(2)}`}
                                            </Col>
                                        </Row>
                                    ))}
                                </ListGroup>
                        }
                        
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup>
                    <ListGroup.Item>
                        <h1>ORDER SUMMERY</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${itemsPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${shippingPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${taxPrice}</Col>
                        </Row>
                        <Row>
                            <Col>Total</Col>
                            <Col>${totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        {error && <AlertMessage>{error}</AlertMessage>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button onClick = {placeOrder}>PLACE ORDER</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen