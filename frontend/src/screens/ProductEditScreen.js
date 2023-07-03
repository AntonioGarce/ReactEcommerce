import React, {useEffect} from 'react'
import {Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

// import validation libraries
import * as Yup from 'yup'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

// import custom components
import { FormContainer } from '../components/FormContainer'
import AlertMessage from '../components/AlertMessage';
import LoadingWrapper from '../components/LoadingWrapper';

// import helper function
import { history } from '../_helpers';

// import actions
import { getProductDetail , updateProductReset, productDetailReset, updateProduct, 
          getProductsReset, uploadProductImage, uploadProductImageReset } from '../slices';

function ProductEditScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const {loading, product } = useSelector(state=>state.productDetail)
  const { success:successUpdate } = useSelector(state=>state.updateProduct)
  const { loading:uploadingImage, success:successUploading, error:errorUploading } = useSelector(state=>state.uploadProductImage)
  // form validation schema 
  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .required('Product name is required.')
      .max(50, 'Product name cannot exceed 30 letters'),
    price: Yup.number('Price is a number.')
      .required('Price infomation is requried.')
      .positive('Price should be positive'),
    brand: Yup.string()
      .required('Brand infomation is requried.')
      .max(50,'Brand cannot exceed 30 letters'),
    countInStock: Yup.number()
      .required('Stock infomation is requried.'),
    category: Yup.string()
      .required('Category infomation is requried.')
      .max(50, 'Category cannot exceed 30 letters'),
    description: Yup.string()
      .max(300, 'Description cannot exceed 300 letters'),
    });
    const formOptions = { mode: "onTouched", resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(()=>{
      console.log(product)
      if(successUpdate) {
        dispatch(productDetailReset())
        dispatch(updateProductReset())
        history.navigate('/admin/products/')
      } else if (!product._id || product._id !== Number(id)){
        dispatch(getProductsReset())
        dispatch(getProductDetail(id))
      }  
      
    },[dispatch,id,successUpdate,product])

    const uploadFileHandler = async (e) => {
      const image = e.target.files[0]
      dispatch(uploadProductImage({id, image}))
    }

    const  onSubmit = ({ productName, price, brand, countInStock, category, description }) => {
      const productInfo = {
        name: productName,
        price: price,
        brand: brand,
        countInStock: countInStock,
        category: category,
        description: description
      }
      dispatch(updateProduct({id, productInfo}))
    }

  return (
    <>
      <LoadingWrapper loading={ loading || product._id !== Number(id)}>
        <FormContainer>
          <h1>Edit Product</h1>
          <Form onSubmit={handleSubmit(onSubmit)} style={{marginTop:30}}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter name'
                    style={{marginBottom:'18px'}}
                    // defaultValue={product?.name}
                    defaultValue = {product?.name}
                    {...register('productName')}
                />
                <AlertMessage>{errors.productName?.message}</AlertMessage>
            </Form.Group>

            <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='Enter Price'
                    style={{marginBottom:'18px'}}
                    defaultValue={product?.price}
                    {...register('price')}
                />
                <AlertMessage>{errors.price?.message}</AlertMessage>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <LoadingWrapper>
                <Form.Control
                  type="file"
                  // style={{border:'solid'}}
                  accept="image/*"
                  onChange={uploadFileHandler}
                />
              </LoadingWrapper>
            </Form.Group>

            <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Brand'
                    style={{marginBottom:'18px'}}
                    // style={{border:'solid'}}
                    defaultValue={product?.brand}
                    {...register('brand')}
                />
                <AlertMessage>{errors.brand?.message}</AlertMessage>
            </Form.Group>
            <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type='category'
                    placeholder='Enter Category'
                    style={{marginBottom:'18px'}}
                    // style={{border:'solid'}}
                    defaultValue={product?.category}
                    {...register('category')}
                />
                <AlertMessage>{errors.category?.message}</AlertMessage>
            </Form.Group>

            <Form.Group controlId='countInStock'>
                <Form.Label>CountInStock</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='Enter CountInStock'
                    style={{marginBottom:'18px'}}
                    // style={{border:'solid'}}
                    defaultValue={product?.countInStock}
                    {...register('countInStock')}
                />
                <AlertMessage>{errors.countInStock?.countInStock}</AlertMessage>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter description'
                    style={{marginBottom:'18px'}}
                    // style={{border:'solid'}}
                    defaultValue={product?.description}
                    {...register('description')}
                />
                <AlertMessage>{errors.description?.message}</AlertMessage>
            </Form.Group>

            <Button type='submit' variant='primary' style={{marginTop:20}} disabled={isSubmitting}>
              Update
            </Button>

          </Form>
        </FormContainer >
      </LoadingWrapper>
    </>
  )
}

export default ProductEditScreen