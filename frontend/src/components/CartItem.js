import React from 'react'
import { Row, Col, Image, Button,  ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// import css style
import styles from '../index.module.css'

// import components
import Qty from '../components/Qty'

// import Actions
import { addToCart, removeFromCart } from '../slices/cartSlice'

function CartItem({ item }) {

  const dispatch = useDispatch()

  const handleChangeQty = (i)=>{
    dispatch(addToCart({id:item.product,qty:i}))
  }

  const handleRemove = (e) => {
    dispatch(removeFromCart(item.product))
  } 

  return (
    <ListGroupItem>
      <Row className={styles.rowCenter}>
        <Col md={3}>
          <Link to={`/product/${item.id}`}>
            <Image src={item.image} alt={item.name} fluid rounded ></Image>
          </Link>
        </Col>
        <Col md={2} >
          <Link to={`/product/${item.id}`}>
            <h5>{item.name} </h5>
          </Link>
        </Col>
        <Col md={2} >
          ${item.price} 
        </Col>
        <Col md={2} >
          <Qty  stockCount={item.countInStock} currQty={item.qty} change={handleChangeQty}></Qty>
        </Col>
        <Col md={1} >
          <Button onClick={handleRemove} type='button' variant='light' >                    
            <i className='fas fa-trash'></i>
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export default CartItem