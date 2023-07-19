import { Row, Col } from 'react-bootstrap'

export const FormContainer = ({ children }) => {
    return(
    <div>
        <Row className='justify-content-center' style={{marginTop:'20px'}} >
            <Col xs={12} md={6} >
                {children}
            </Col>
        </Row>
    </div>
    )
}