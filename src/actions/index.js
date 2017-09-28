export const receiveData = (dataType) => {
  return (data) => {
    return {
      type: 'RECEIVE_' + dataType.toUpperCase(),
      data
    }
  }
}

export const loadData = () => dispatch =>
  Promise.all([
    loadDataFor('orders', dispatch),
    loadDataFor('products', dispatch),
    loadDataFor('clients', dispatch)
  ])


const loadDataFor = (dataType, dispatch) => {
  return fetch('http://localhost:1112/' + dataType)
    .then(response => response.json())
    .then(data => {
      if (dataType === 'orders') {
        dispatch(receiveData('items')(data))
      }
      dispatch(receiveData(dataType)(data))
    })
}

export const removeItem = (orderId, itemId) => {
  return {
    type: 'REMOVE_ITEM_FROM_LIST',
    orderId,
    itemId
  }
}

export const addItem = (orderId, item, quantity) => {
  return {
    type: 'ADD_ITEM_TO_LIST',
    orderId,
    item,
    quantity
  }
}

export const changeClient = (orderId, clientId) => {
  return {
    type: 'CHANGE_CLIENT',
    orderId,
    clientId
  }
}
