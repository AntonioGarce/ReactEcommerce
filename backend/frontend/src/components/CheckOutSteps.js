import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckOutSteps = ( { step } ) => {
    return (
        <>
            {
                <Nav className='justify-content-center mb4'>
                    <Nav.Item>
                        <LinkContainer to='/login'>
                            <Nav.Link disabled={step<1}>Login</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to='/shipping'>
                            <Nav.Link disabled={step<2}>Shipping</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to='/payment'>
                            <Nav.Link disabled={step<3}>Payment</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to='/placeorder'>
                            <Nav.Link disabled={step<4}>Place order</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
            }
        </>
    )
}

export default CheckOutSteps