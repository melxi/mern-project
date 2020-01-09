import axios from 'axios'

const baseURL = '/api/auth'
let token = null

const setToken = newToken => {
  token = newToken
}

const destroyToken = () => {
  token = null
}

const loadUser = () => {
  const config = {
    headers: {
      'Content-type': 'application/json',
      'X-Auth-Token': token
    }
  }

  const request = axios.get(`${baseURL}/user`, config)
  return request.then(response => response.data)
}

const login = credentials => {
  const request = axios.post(baseURL, credentials)
  return request.then(response => response.data)
}

export default {
  setToken,
  destroyToken,
  loadUser,
  login
}
