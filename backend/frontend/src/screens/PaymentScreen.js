import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'

// import action
import { savePaymentMethod } from '../slices'

// import helper
import { history } from '../_helpers' 

function PaymentScreen() { 
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart)

    const shippingAddress = cart.shippingAddress

    if(!shippingAddress) {
        history.navigate('/shipping')
    }

    const onSubmit = () => {
        dispatch(savePaymentMethod(paymentMethod))
        history.navigate('placeorder')
    }
    return (
        <FormContainer>
            <CheckOutSteps step={3} />
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label as='legend'  style={{display:'block', alignSelf:'center'}}>Select Method</Form.Label>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        onChange={e => setPaymentMethod(e.target.value)}
                        checked
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
