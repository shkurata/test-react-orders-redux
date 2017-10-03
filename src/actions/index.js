export const receiveData = dataType => {
  return data  => {
    return {
      type: 'RECEIVE_' + dataType.toUpperCase(),
      data
    }
  }
}

export const loadData = () => dispatch => {
  Promise.all([
    loadDataFor('orders', dispatch),
    loadDataFor('products', dispatch),
    loadDataFor('clients', dispatch),
  ]).then(() => dispatch(dataIsLoaded(true)))
}


const loadDataFor = (dataType, dispatch) => {
  return fetch('http://localhost:1112/' + dataType)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (dataType === 'orders') {
        dispatch(receiveData('items')(data))
      }
      dispatch(receiveData(dataType)(data))
    })
}

export const removeItem = (orderId, itemId, itemTotal) => {
  return {
    type: 'REMOVE_ITEM_FROM_LIST',
    orderId,
    itemId,
    itemTotal
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

export const dataIsLoaded = status => {
  return {
    type: 'DATA_IS_LOADED',
    status
  }
}

export const saveOrderOnServer = order => {
  return {
    type: 'SAVE_ORDER_ON_SERVER',
    order
  }
}

export const addEmptyOrder = orderId => {
  return {
    type: 'ADD_EMPTY_ORDER',
    orderId
  }
}
