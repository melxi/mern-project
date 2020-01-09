import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import useField from '../../hooks'

import {
  Alert,
  Button,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

const LoginModal = props => {
  const email = useField('email')
  const password = useField('password')

  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // Check for login error
    if (props.error.id === 'LOGIN_FAIL') {
      setMessage(props.error.msg.msg)
    } else {
      setMessage(null)
    }

    // Close modal if authenticated
    if (modal) {
      if (props.isAuthenticated) {
        toggle()
      }
    }
  }, [props.error, props.isAuthenticated])

  const toggle = () => {
    // Clear errors when closing modal
    props.clearErrors()
    setModal(!modal)
  }

  const onSubmit = event => {
    event.preventDefault()

    const user = {
      email: email.value,
      password: password.value
    }
    // Attemp to login
    props.loginUser(user)
  }

  return (
    <div>
      <NavLink href="#" onClick={toggle}>
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {message ? <Alert color="danger">{message}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                {...email}
                id="email"
                placeholder="Email"
                className="mb-3"
              ></Input>
              <Label for="password">Password</Label>
              <Input
                {...password}
                id="password"
                placeholder="Password"
                className="mb-3"
              ></Input>
              <Button color="dark" block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
}

const mapDispatchToProps = {
  loginUser,
  clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
