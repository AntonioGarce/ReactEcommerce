import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// import helper functions 
import { history } from '../_helpers'

//import actions
import { getProductDetail } from '../slices'

// import custom components
import LoadingWrapper from '../components/LoadingWrapper'
import Rating from '../components/Rating'
import Qty from '../components/Qty'

function ProductScreen() {
  const [ qty, setQty ] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, product, error } = useSelector((state) => state.productDetail)
  
  const handleChange = (i) => {
    setQty(i)
  }

  const  addToCartHandler = () => {
    history.navigate(`/cart/${id}?qty=${qty}`)
  }

  useEffect(()=>{
    dispatch(getProductDetail(id))
  },[ dispatch, id ]) 

  return (
    <div>
        <Link to='/'>
            Go Back
        </Link>
        <LoadingWrapper loading={loading} error={error}>
            <Row>
                <Col md={6}>
                    <ListGroup.Item>
                        <Image src={product.image} fluid={true} roundedCircle={true} ></Image>
                    </ListGroup.Item>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h5>{product.category}</h5>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825' />
                        </ListGroupItem>
                        <ListGroupItem>
                            <h6>Price: {product.price}$</h6>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h6>Description: </h6>
                            <h6>{product.description}</h6>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    {product.price}
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {
                                        product.countInStock>0
                                        ? 'InStock'
                                        : 'OutStock'
                                    }
                                </Col>
                            </Row>
                        </ListGroupItem>
                        {
                            product.countInStock>0
                            ? <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Qty:
                                        </Col>
                                        <Col>
                                            <Qty change={handleChange} stockCount={product.countInStock} currQty={qty} />
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            : ''
                        }
                        
                        <ListGroupItem>
                            <Button className='btn-block' disabled={product.countInStock===0} onClick={addToCartHandler} type='button'>Add Card</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                {/* <Col md={3}>
                    <Row>
                        <Col>
                            <h3>{product.name}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>{product.category}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='mt-2 mb-3'>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825' />
                            </div>      
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='mb-3'>
                                <h7>Price:{product.price}$</h7>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h7>Description: </h7>
                            <br/>
                            <h7>{product.description}</h7>
                        </Col>
                    </Row>
                </Col> */}
            </Row>
        </LoadingWrapper>
        
    </div>
  )
}

export default ProductScreen