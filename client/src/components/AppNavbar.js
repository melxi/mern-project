import React, {useState} from 'react'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <Navbar className='mb-5' color='dark' dark expand='sm'>
        <Container>
          <NavbarBrand href='/'>
            ShoppingList
          </NavbarBrand>
          <NavbarToggler onClick={toggle}></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='https://github.com/melxi'>
                  Github
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar