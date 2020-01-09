import itemService from '../services/items'
import { returnErrors } from './errorActions'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'

export const getItems = () => async dispatch => {
  dispatch(setItemsLoading())
  const items = await itemService.getAll()
  dispatch({
    type: GET_ITEMS,
    payload: items
  })
}

export const addItem = item => async (dispatch, getState) => {
  try {
    const token = getState().auth.token
    const newItem = await itemService.create(item, token)
    dispatch({
      type: ADD_ITEM,
      payload: newItem
    })
  } catch (exception) {
    dispatch(returnErrors(exception.response.data, exception.response.status))
  }
}

export const deleteItem = id => async (dispatch, getState) => {
  try {
    const token = getState().auth.token
    await itemService.remove(id, token)
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  } catch (exception) {
    dispatch(returnErrors(exception.response.data, exception.response.status))
  }
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
