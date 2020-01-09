import itemService from '../services/items'
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'

export const getItems = () => async dispatch => {
  dispatch(setItemsLoading())
  const items = await itemService.getAll()
  dispatch({
    type: GET_ITEMS,
    payload: items
  })
}

export const addItem = item => async dispatch => {
  const newItem = await itemService.create(item)
  dispatch({
    type: ADD_ITEM,
    payload: newItem
  })
}

export const deleteItem = id => async dispatch => {
  await itemService.remove(id)
  dispatch({
    type: DELETE_ITEM,
    payload: id
  })
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
}
