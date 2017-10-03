import { transformArray } from './clients'

const products = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return transformArray(action.data)
    default:
      return state
  }
}

export default products
