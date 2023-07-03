import React, { useEffect} from 'react'
import { Alert, Col, ListGroup, Row, Image } from 'react-bootstrap'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// import actions
import { getOrder } from '../slices'
import { payOrder, payOrderReset} from '../slices'

// import custom components
import AlertMessage from '../components/AlertMessage'
import LoadingWrapper from '../components/LoadingWrapper'

// import helper
import Loader from '../components/Loader'
// AS4kbd1bXhEAnWzIIEtGLpmGs1c5YA_n9LjeL-c_BgJXQc138extu-SGnE4ruGOsSPDS8u4_Y3BvcKny

function OrderScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [{ isPending,isResolved,isRejected }] = usePayPalScriptReducer();
  const { loading, order, error, success } = useSelector(state=>state.orderDetail)
  const { loading: loadingPay, success: successPay } = useSelector(state=>state.payOrder)
  const {user, paymentMethod, shippingAddress, orderItems, taxPrice, shippingPrice, totalPrice} = order

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder({id:order._id, paymentResult}))
  }

  useEffect(()=>{
    if(!order || successPay || order._id !== Number(id))
    {
        dispatch(payOrderReset())
        dispatch(getOrder(id))
    } else if(!order.isPaid)
    {

    }
    
  },[order,dispatch,id,successPay,isPending,isRejected,isResolved])

  return (
  <div>
    { 
        !success ? '' :
        <LoadingWrapper loading={loading} error={error}>
            <h1>ORDER: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>SHIPPING</h2>
                            <p> <strong>Name: {user.name}</strong> </p>
                            <p> <strong>Email: </strong><a href={`mailto:${user.email}`}>{user.email}</a> </p>
                            <p> <strong>Shipping: {`${shippingAddress.address} ${shippingAddress.city,shippingAddress.postalCode} ${shippingAddress.country}`}</strong> </p>
                            <p> <Alert variant='warning'>Not delivered</Alert> </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>PAYMENT METHOD</h2>
                            <p> <strong>Method: {paymentMethod}</strong> </p>
                            {!order.isPaid && <p> <Alert variant='warning'>Not Paid</Alert> </p>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>ORDER ITEMS</h2>
                            { orderItems.length === 0 
                                ?   <AlertMessage>Order is empty.</AlertMessage>
                                :   <ListGroup>
                                        <ListGroup.Item>
                                            {
                                                orderItems.map((item,i) => (
                                                    <Row key={i}>
                                                        <Col><Image src={item.image} alt={item.product} fluid rounded /></Col>
                                                        <Col><strong>{item.name}</strong></Col>
                                                        <Col><strong>{`${item.qty}*$${item.price}=$${(item.price*item.qty).toFixed(2)}`}</strong></Col>
                                                    </Row>
                                                ))
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>ORDER SUMMARY</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${orderItems.reduce((acc,item) => acc = acc + item.price*item.qty, 0)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && 
                            <ListGroup.Item>
                                {loadingPay && <Loader/>}
                                {isPending && <Loader/>}
                                {isRejected && <AlertMessage>Failed to load paypal buttons.</AlertMessage>}
                                {isResolved && 
                                    <PayPalButtons  
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        value: totalPrice,
                                                    },
                                                },
                                            ],
                                        });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                const name = details.payer.name.given_name;
                                                console.log(`Transaction completed by ${name}`);
                                                // console.log(details)
                                                successPaymentHandler(details.status==="COMPLETED")
                                            });
                                        }}
                                    />
                                }
                            </ListGroup.Item>
                     }
                    </ListGroup>
                </Col>
            </Row>
        </LoadingWrapper>
    }
    </div>
  )
}

export default OrderScreen