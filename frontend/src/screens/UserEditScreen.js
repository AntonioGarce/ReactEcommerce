import React, {useEffect, useState} from 'react'
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
import { updateUser, updateUserReset } from '../slices/userSlice';
import LoadingWrapper from '../components/LoadingWrapper';

// import actions
import { getUserDetails,userDetailReset } from '../slices';

// import helper function
import { history } from '../_helpers';

function UserEditScreen() {
  const { id } = useParams()
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()
  const { user, error } = useSelector(state => state.userDetail)
  const { success:successUpdate,} = useSelector(state=>state.updateUser)

  // form validation schema 
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('User name is required.')
      .max(30, 'User name cannot exceed 30 letters'),
    email: Yup.string()
      .email('This is not an email format.').required('email is requried'),
    });
    const formOptions = { mode: "onTouched", resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(()=>{
      if(successUpdate) {
        dispatch(updateUserReset())
        dispatch(userDetailReset())
        history.navigate('/admin/users')
      }else{
        if (!user || user._id !== Number(id)){
          dispatch(getUserDetails(id))
        } else {
          setIsAdmin(user.isAdmin)
        }
      } 
    },[id,dispatch,user,successUpdate])

    const  onSubmit = ({ name, email }) => {
      console.log( { id, name, email, isAdmin } )
      return dispatch(updateUser( { id, name, email, isAdmin } ));
    }

  return (
    <div>
      <LoadingWrapper loading={!user || user._id !== Number(id)} error={error}>
        <FormContainer>
          <h1>Edit User</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                  type='name'
                  placeholder='Enter name'
                  defaultValue={user?.name}
                  {...register('name')}
              />
              <AlertMessage>{errors.name?.message}</AlertMessage>
          </Form.Group>

          <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  defaultValue={user?.email}
                  {...register('email')}
              />
              <AlertMessage>{errors.email?.message}</AlertMessage>
          </Form.Group>

          <Form.Group controlId='isadmin'>
              <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
              >
              </Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary' disabled={isSubmitting} >
            Update
          </Button>

          </Form>
        </FormContainer >
      </LoadingWrapper>
    </div>
  )
}

export default UserEditScreen