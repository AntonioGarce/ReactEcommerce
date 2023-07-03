import React, { useEffect } from 'react'
import {Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// import Actions 
import { getProducts } from '../slices'

// import custom components
import Product from '../components/Product'
import LoadingWrapper from '../components/LoadingWrapper'

function HomeScreen() {
  const dispatch = useDispatch()
  const { loading, products, error } = useSelector(state=>state.productList)

  useEffect(()=>{
    dispatch(getProducts())
  },[ dispatch ])

  return (

    <div>
        <h1>Latest Products</h1>
        <LoadingWrapper loading={loading} error={error}>
          <Row>
              {products.map((item, i)=>(
              <Col key={i}  sm={12} md={6} lg={4} xl={3}><Product product={item}></Product></Col>))}
          </Row>
        </LoadingWrapper>
    </div>
  )
}

export default HomeScreen