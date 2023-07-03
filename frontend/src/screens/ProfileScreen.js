import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, Button,Table } from 'react-bootstrap';
import AvatarPicker from '../components/AvatarPicker';
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../slices/userSlice';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from '@mui/material/Pagination';

// import custom components
import LoadingWrapper from '../components/LoadingWrapper'
import ProfileUpdateForm from '../components/ProfileUpdateForm';

// import actions
import { listMyOrders } from '../slices';

export default function ProfileScreen() {
  const dispatch = useDispatch()

  const { loading, user, error } = useSelector(state=>state.userDetail)
  const newuser = useSelector(state=>state.updateUserDetail)

  const [avatar, setAvatar] = useState()
  const [securityInfo, setSecurityInfo] = useState(false)

  const { orders} = useSelector(state=>state.myOrders)
  const numOrders = !orders? 0: orders.length
  const numPages = Math.floor(numOrders/3)
  const [page, setPage] = useState(0)
  const [orderStart, setOrderStart] = useState(numOrders)
  const [showAll, setShowAll] = useState(false) 

  const handlePagination = (event,value) => {
    if (value !== null) {
      setPage(value-1);
      setOrderStart(3*page)
    }
  }

  useEffect(() => {
    dispatch(getUserDetails('profile'))
    dispatch(listMyOrders())
  },[dispatch])

  const handleChangeImage = (imageFile) => {
    setAvatar(imageFile)
  }

  const handleEditProfile = (e) => {
    console.log('edit profile clicked')
  }

  return (
    <LoadingWrapper loading={loading} error={error}>
      <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        <Container className="py-5 h-100">
          <Row className="justify-content-center align-items-center h-100">
            <Col lg="9" xl="7">
              <Card>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px', mt:'-20px', alignItems: 'center'}}>
                    <AvatarPicker handleChangeImage={handleChangeImage} avatarImage={avatar} />
                    <Button color="dark" style={{height: '36px'}} onClick={handleEditProfile} >
                      Update
                    </Button>
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <Card.Text> { newuser.name?newuser.name:(user?.name) }  </Card.Text>
                    <Card.Text>from Hanoi</Card.Text>
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <Card.Text className="mb-1 h5">253</Card.Text>
                      <Card.Text className="small text-muted mb-0">Photos</Card.Text>
                    </div>
                    <div className="px-3">
                      <Card.Text className="mb-1 h5">1026</Card.Text>
                      <Card.Text className="small text-muted mb-0">Followers</Card.Text>
                    </div>
                    <div>
                      <Card.Text className="mb-1 h5">478</Card.Text>
                      <Card.Text className="small text-muted mb-0">Following</Card.Text>
                    </div>
                  </div>
                </div>
                <Card.Body className="text-black p-4">
                  <div className="mb-5">
                    <Button onClick={()=>{setSecurityInfo(!securityInfo)}} variant='link' className='btn '><p className="lead fw-normal mb-1">Update Sercurity Infomation</p></Button>
                    {securityInfo?<ProfileUpdateForm user={ user } />:''}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Card.Text className="lead fw-normal mb-0">My Orders</Card.Text>
                    <Card.Text className="mb-0">
                      <Button variant='link' onClick={e=>{setShowAll(!showAll)}} >{showAll?'Recent Orders':'Show All'}</Button>
                    </Card.Text>
                  </div>
                  <Row>
                    {
                      !showAll && orders &&
                      orders.slice(orderStart,orderStart+3).map((order,i)=>{
                        let isPaidIcon = order.isPaid ? 'check':'times'
                        let isPaidColor = order.isPaid ? 'green':'red'
                        let isDeliveredIcon = order.isDelivered ? 'check':'times'
                        let isDeliveredColor = order.isDelivered ? 'green':'red'
                        const element = 
                          (<Col className="mb-2">
                              <Card.Text color='black'>
                                <LinkContainer to={`/order/${order._id}`}><h4>{order._id}</h4></LinkContainer>
                                <h6>Date: {order.createdAt.substring(0,10)}</h6>
                                <h6>Total: {order.totalPrice}$</h6>
                                <h6>isPaid: <i style={{color:`${isPaidColor}`}} className={`fas fa-${isPaidIcon}`}/> </h6>
                                <h6>isDelivered: <i style={{color:`${isDeliveredColor}`}} className={`fas fa-${isDeliveredIcon}`}/> </h6>
                              </Card.Text>
                            </Col>)
                        return element
                      })
                    }
                  </Row>
                  {showAll && <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? <i className='fas fa-check' style={{ color: 'green' }}></i> : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table> }
                  <Row>
                    <Col>
                      {!showAll && <Pagination count={numPages} color="secondary" variant="outlined" shape='rounded' onChange={handlePagination} />}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </LoadingWrapper>
  );
}