import authService from '../services/auth'
import userService from '../services/users'
import { returnErrors } from './errorActions'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types'

// Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  })

  try {
    const token = getState().auth.token
    authService.setToken(token)
    const user = await authService.loadUser()
    dispatch({
      type: USER_LOADED,
      payload: user
    })
  } catch (exception) {
    dispatch(returnErrors(exception.response.data, exception.response.status))
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const registerUser = ({ name, email, password }) => async dispatch => {
  try {
    const newUser = await userService.register({ name, email, password })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: newUser
    })
  } catch (exception) {
    dispatch(
      returnErrors(
        exception.response.data,
        exception.response.status,
        'REGISTER_FAIL'
      )
    )
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}
