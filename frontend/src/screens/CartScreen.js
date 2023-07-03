import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
// import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

// import helper function
import { history } from '../_helpers'

// import actions 
import { addToCart } from '../slices'

// import custom component
import CartItem from '../components/CartItem'

function CartScreen() {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)
  // const search = useLocation().search;
  // const qty = new URLSearchParams(search).get('qty');

  const [ query, ] = useSearchParams()
  const qty = query.get('qty') 

  console.log('header')

  const handleCheckOut = () => {
    history.navigate('/shipping')
  }

  useEffect(() => {
    if(id){
      dispatch(addToCart({id,qty}))
    }
    console.log('effect')
  },[dispatch, id, qty, query])

  return (
    <Row>
        <Col md={8}>
          <ListGroup>
            {cartItems.map((el,i) => (<CartItem key={i} item = {el}> </CartItem>))}
          </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h2>
                  ${cartItems.reduce((acc, item) => acc + item.price*item.qty, 0).toFixed(2)}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <Button type='button' className='btn-block' onClick={handleCheckOut} disabled={!!!cartItems} >Preeceding Checkout</Button>
              </ListGroup.Item>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen