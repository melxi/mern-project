import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import PropTypes from 'prop-types'
import useField from '../../hooks/'

import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'

const RegisterModal = props => {
  const name = useField('name')
  const email = useField('email')
  const password = useField('password')

  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // Check for register error
    if (props.error.id === 'REGISTER_FAIL') {
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
    props.clearErrors()
    setModal(!modal)
  }

  const onSubmit = event => {
    event.preventDefault()

    // Create user object
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value
    }

    // Appempt to register
    props.registerUser(newUser)
  }

  return (
    <div>
      <NavLink href="#" onClick={toggle}>
        Register
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {message ? <Alert color="danger">{message}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                {...name}
                id="name"
                placeholder="Name"
                className="mb-3"
              ></Input>
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
              <Button className="mt-3" color="dark" block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
}

const mapDispatchToProps = {
  registerUser,
  clearErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)
