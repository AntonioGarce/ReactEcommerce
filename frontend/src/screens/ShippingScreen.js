import { Button, Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'

// form validation libraries
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';

// import actions
import { saveShippingAddress } from '../slices';

// import customized components
import AlertMessage from '../components/AlertMessage'
import CheckOutSteps from '../components/CheckOutSteps';

// import helper 
import { history } from '../_helpers';

const ShippingScreen = function ShippingForm() {
  const validationSchema = Yup.object().shape(
    {
      address: Yup.string()
        .required(),
      city: Yup.string()
        .required()
        .max(30),
      postalCode: Yup.string()
        .required()
        .max(30),
      country: Yup.string()
        .required()
        .max(30)
    }
  )

  const formOptions = { mode: "onTouched", resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions)

  const { errors, isSubmitting } = formState

  const dispatch = useDispatch()

  const { address, city, postalCode, country } = useSelector(state=>state.cart.shippingAddress)

  const onSubmit = ({ address, city, postalCode, country }) => {
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    history.navigate('/payment')
  }

  return (
    <div>
      <CheckOutSteps step={2} />
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup  size='sm'>
            {/* <FormLabel>Shipping Address</FormLabel> */}
            <InputGroup style={{border:'solid'}}>
              <InputGroup.Text  id="basic-addon1">
                <i className='fas fa-address-card' ></i>
              </InputGroup.Text>
              <FormControl {...register('address')} defaultValue={address}  size='sm'  type = 'text' placeholder='Shipping Address' />
            </InputGroup>
            
            <AlertMessage sx={{mt:'2px'}}>{errors.address?.message}</AlertMessage>
          </FormGroup>
          <FormGroup size='sm'>
            {/* <FormLabel>City</FormLabel> */}
            <InputGroup style={{border:'solid'}}>
              <InputGroup.Text >
                <i className='fas fa-city' ></i>
              </InputGroup.Text>
              <FormControl {...register('city')} defaultValue={city} size='sm'   type = 'text' placeholder='City'/>
            </InputGroup>
            <AlertMessage sx={{mt:'2px'}}>{errors.city?.message}</AlertMessage>
          </FormGroup>
          <FormGroup size='sm'>
            {/* <FormLabel>Postal code</FormLabel> */}
            <InputGroup style={{border:'solid'}}>
              <InputGroup.Text >
                <i className='fas fa-map-pin' ></i>
              </InputGroup.Text >
              <FormControl  {...register('postalCode')} defaultValue={postalCode} size='sm' type = 'text' placeholder='ZIP code'/>
            </InputGroup>
            <AlertMessage sx={{mt:'2px'}}>{errors.postalCode?.message}</AlertMessage>
          </FormGroup>
          <FormGroup size='sm'>
            {/* <FormLabel>Country</FormLabel> */}
            <InputGroup style={{border:'solid'}}>
              <InputGroup.Text>
                <i className='fas fa-flag' ></i>
              </InputGroup.Text>
              <FormControl {...register('country')} defaultValue={country} size='sm'  type = 'text' placeholder='Country'/>
            </InputGroup>
            <AlertMessage sx={{mt:'2px'}}>{errors.country?.message}</AlertMessage>
          </FormGroup>
          <Button type='submit' disabled={isSubmitting} size='sm' style={{position:'absolute', left:'40%'}}> Continue </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ShippingScreen