import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>Copy right &copy; ProShop</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer