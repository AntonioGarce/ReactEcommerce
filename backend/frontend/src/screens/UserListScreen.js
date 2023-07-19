import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import components
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// import actions
import { getUsers, deleteUser } from '../slices'

// import helper function
import { history } from '../_helpers'

// import custom components
import LoadingWrapper from '../components/LoadingWrapper'

function UserListScreen() {

  const dispatch = useDispatch()
  const { loading, users, error } = useSelector(state=>state.users)
  const { user } = useSelector(state=>state.auth)
  const { success: successDelete } = useSelector(state=>state.deleteUser)

  const deleteUserHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
    }
  }

  useEffect(()=>{
    if(user && user.isAdmin){
      dispatch(getUsers())
    } else {
      history.navigate('/login')
    }
  },[dispatch, user, successDelete])

  return (
    <div>
      <h1>Users</h1>
      <LoadingWrapper loading={loading} error={error}>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
              </tr>
          </thead>

          <tbody>
              {users.map(user => (
                  <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? (
                          <i className='fas fa-check' style={{ color: 'green' }}></i>
                      ) : (
                              <i className='fas fa-times' style={{ color: 'red' }}></i>
                          )}</td>

                      <td>
                          <LinkContainer to={`/admin/user/${user._id}/edit`}>
                              <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                              </Button>
                          </LinkContainer>

                          <Button variant='danger' className='btn-sm' onClick={()=>deleteUserHandler(user._id)}>
                              <i className='fas fa-trash'></i>
                          </Button>
                      </td>
                  </tr>
              ))}
          </tbody>
        </Table>
      </LoadingWrapper>
    </div>
  )
}

export default UserListScreen