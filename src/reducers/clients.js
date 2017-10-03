const clients = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CLIENTS':
      return transformArray(action.data)
    default:
      return state
  }
}

export const transformArray = array =>
  array.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})

export default clients
