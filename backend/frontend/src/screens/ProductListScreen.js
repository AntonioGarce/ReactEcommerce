import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import components
import { Row,Col,Table,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// import custom components
import LoadingWarpper from '../components/LoadingWrapper'

// import helper function
import { history } from '../_helpers'

// import redux action
import { getProducts, deleteProduct, deleteProductReset, createProduct, createProductReset} from '../slices'

function ProductListScreen() {

  const { loading, products, error } = useSelector(state=>state.productList)
  const { user } = useSelector(state=>state.auth)
  const { success:successDelete } = useSelector(state=>state.deleteProduct)
  const { product:newProduct, success:successCreate } = useSelector(state=>state.createProduct)

  const dispatch = useDispatch()

  const deleteProductHandler = (id) => {
    if(window.confirm('Do you want really delete this product?')){
        dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  useEffect(()=>{
    dispatch(createProductReset())
    if (user && user.isAdmin){
        if(successCreate){
            history.navigate(`/admin/product/${newProduct._id}/edit`)
        }else if(!products.length || successDelete)
        {
            dispatch(getProducts())
            dispatch(deleteProductReset())
        }
    } else {
        history.navigate('/login')
    }
  },[dispatch,newProduct._id,user,products.length,successDelete,successCreate])

  return (
    <>
        <Row>
            <Col className='align-items-center'>
                <h1> Products </h1>
            </Col>
            <Col className='text-right'>
                <Button onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        <LoadingWarpper loading={loading} error={error}>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
              </tr>
          </thead>

          <tbody>
              {products.map(product => (
                  <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>  
                      <td>
                          <LinkContainer to={`/admin/product/${product._id}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                              </Button>
                          </LinkContainer>

                          <Button variant='danger' className='btn-sm' onClick={()=>deleteProductHandler(product._id)}>
                              <i className='fas fa-trash'></i>
                          </Button>
                      </td>
                  </tr>
              ))}
          </tbody>
        </Table>
      </LoadingWarpper>
    </>
  )
}

export default ProductListScreen
