import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import {
  NavLink
} from 'reactstrap'

const Logout = (props) => {
  return (
    <Fragment>
      <NavLink href="#" onClick={props.logoutUser}>
        Logout
      </NavLink>
    </Fragment>
  )
}

const mapDispatchToProps = {
  logoutUser
}

export default connect(null, mapDispatchToProps)(Logout)