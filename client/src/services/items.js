import axios from 'axios'
const baseURL = '/api/items'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = (newObject, token) => {
  const config = {
    headers: {
      'X-Auth-Token': token
    }
  }
  const request = axios.post(baseURL, newObject, config)
  return request.then(response => {
    return response.data
  })
}

const remove = (id, token) => {
  const config = {
    headers: {
      'X-Auth-Token': token
    }
  }
  const request = axios.delete(`${baseURL}/${id}`, config)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  remove
}
