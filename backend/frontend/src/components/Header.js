import React from 'react'
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

import { history } from '../_helpers'

function Header() {

  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    if (user){
      dispatch(logout())
      history.navigate('/login')
    }    
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to='/cart'>
                  <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                </LinkContainer>
                {!user
                ?
                <LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                </LinkContainer>
                : user.isAdmin &&
                <NavDropdown title='Admin' id="collasible-nav-dropdown">
                  <LinkContainer to='admin/users'>
                    <NavDropdown.Item><i className='fas fa-user'></i>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='admin/products'>
                    <NavDropdown.Item><i className='fas fa-shopping-cart'></i>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                }
              </Nav>
            </Navbar.Collapse>
            { user
            ?
            <NavDropdown title={user.name} id="collasible-nav-dropdown">
              <LinkContainer to='/profile'>
                <NavDropdown.Item>
                  View Profile
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={handleLogOut}>
                LogOut
              </NavDropdown.Item>
            </NavDropdown>
            : ''
            }
        </Container>
      </Navbar>
    </header>
  )
}

export default Header