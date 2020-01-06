import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types'

const initialState = {
	items: [],
	isLoading: false
}

const itemReducer = (state = initialState, action) => {
	switch(action.type) {
	case GET_ITEMS:
		return {
			...state,
			items: action.payload,
			isLoading: false
		}
	case ADD_ITEM:
		return {
			...state,
			items: state.items.concat(action.payload)
		}
	case DELETE_ITEM:
		return {
			...state,
			items: state.items.filter(item => item.id !== action.payload)
		}
	default:
		return state
	}
}

export default itemReducer