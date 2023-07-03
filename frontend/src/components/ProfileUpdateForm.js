import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Alert, Snackbar } from '@mui/material';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup'
import { Formik } from 'formik';
import { useState } from 'react';

// import redux
import { useDispatch, useSelector } from 'react-redux';

// import slices
import { updateUserProfile } from '../slices/userSlice'
import { useEffect } from 'react';

const schema = yup.object().shape({

  name: yup.string()
    .required()
    .min(3)
    .max(50),

  password: yup.string()
    .required()
    .max(50),

  newpassword: yup.string()
    .required()
    .min(5)
    .max(50),

  confirmpassword: yup.string()
    .required()
    .min(5)
    .max(50)
    .oneOf([yup.ref("newpassword")], "Passwords do not match"),

});

const EditGroup = ({error, icon, title, size, defaultValue, ...props}) => {

    return(
        <Form.Group as={Col} md="6" controlId="validationFormik01">
            <Form.Label>{title}</Form.Label>
            <InputGroup size = {size}>
            <Button type='button' size={size}>
                <i className={ icon }></i>
            </Button>
            <Form.Control
              {...props} 
              defaultValue={defaultValue}
            />
            <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    )
}

const ProfileUpdateForm = ({ user }) => {
  
  const [open, setOpen] = useState(false)
  const newuser = useSelector(state=>state.updateUserDetail.user)
  const error = useSelector(state=>state.updateUserDetail.error)
  useEffect(()=>{
    if (newuser || error) setOpen(true)
    console.log('newuser')
  },[newuser, error])

  const dispatch = useDispatch()

  const onSubmit = (new_user) => {
    console.log(new_user)
    dispatch(updateUserProfile(new_user))
  }

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        password: '',
        newpassword: '',
        confirmpassword: ''
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleToastClose}>
            <Alert onClose={ handleToastClose } severity={ error? "error" : "success" } sx={{ width: '100%' }}>
              { error? "Profile update failed." : "Profile updated successfully!" }
            </Alert>
          </Snackbar>
          <Row className="mb-3">
            <EditGroup 
                title='Name'
                size='sm'
                icon='fas fa-user'
                style={{border:'solid'}}
                type="text"
                name="name"
                // value={values.name}
                onChange={handleChange}
                isValid={isValid.name}
                isInvalid={!!errors.name}
                error = {errors.name}
                defaultValue = {user?.name}
            />
            <EditGroup 
                title='Password'
                size='sm'
                icon='fas fa-lock'
                style={{border:'solid'}}
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={isValid.password}
                isInvalid={!!errors.password}
                error = {errors.password}
            />
          </Row>
          <Row className="mb-3">
            <EditGroup 
                title='New Password'
                size='sm'
                icon='fas fa-lock'
                style={{border:'solid'}}
                type="text"
                name="newpassword"
                value={values.newpassword}
                onChange={handleChange}
                isValid={isValid.newpassword}
                isInvalid={!!errors.newpassword}
                error = {errors.newpassword}
            />
            <EditGroup 
                title='Confirm Password'
                size='sm'
                icon='fas fa-lock'
                style={{border:'solid'}}
                type="text"
                name="confirmpassword"
                value={values.confirmpassword}
                onChange={handleChange}
                isValid={isValid.confirmpassword}
                isInvalid={!!errors.confirmpassword}
                error = {errors.confirmpassword}
            />
          </Row>

          <Col>
            <Button variant='primary' type="submit">Update</Button>
          </Col>
        </Form>
      )}
    </Formik>
  );
}

export default ProfileUpdateForm 