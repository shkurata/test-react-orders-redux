import {combineReducers} from 'redux'

const products = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return transformArray(action.data)
    default:
      return state
  }
}

const clients = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_CLIENTS':
      return transformArray(action.data)
    default:
      return state
  }
}

const orders = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_ORDERS':
      return removeItemsFromOrders(action.data)
    case 'CHANGE_CLIENT':
      return {
        ...state,
        [action.orderId]: {
          ...state[action.orderId],
          'customer-id': action.clientId,
          changed: true
        }
      }
    case 'ADD_EMPTY_ORDER':
      return {
        ...state,
        [action.orderId]: {
          id: action.orderId,
          'customer-id': '1',
          total: 0
        }
      }
    case 'ADD_ITEM_TO_LIST':
      return {
        ...state,
        [action.orderId]: {
            ...state[action.orderId],
            total: (+state[action.orderId].total + +action.item.price * action.quantity).toFixed(2),
            changed: true
        }
      }
      case 'REMOVE_ITEM_FROM_LIST':
        return {
          ...state,
          [action.orderId]: {
              ...state[action.orderId],
              total: (state[action.orderId].total - action.itemTotal).toFixed(2),
              changed: true
          }
        }

    default:
      return state
  }
}

const removeItemFromObject = (obj, itemName) => {
  let {[itemName]: omit, ...res} = obj
  return res
}

const removeItemsFromOrders = orders =>
  transformArray(orders.map(order => removeItemFromObject(order, 'items')))

const orderItemsToOuterObject = orders =>
  orders.map(order => ({
    id: order.id,
    items: order.items.reduce((obj, item) => {
          obj[item['product-id']] = item
          return obj
        },{})
      })
    ).reduce((obj, product) => {
      obj[product.id] = product.items
      return obj
    },{})


const transformArray = array =>
  array.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})

const itemList = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_LIST':
      const { orderId, item, quantity } = action
      return {
          ...state,
          [orderId]: {
            ...state[orderId],
            [item.id]: addItemToList(state[orderId], item, quantity)
          }
      }
    case 'REMOVE_ITEM_FROM_LIST':
      return {
        ...state,
        [action.orderId]: removeItemFromObject(state[action.orderId], action.itemId)
      }
    case 'RECEIVE_ITEMS':
      return orderItemsToOuterObject(action.data)
    case 'ADD_EMPTY_ORDER':
      return {
        ...state,
        [action.orderId]: {}
      }
    default:
      return state
  }
}

const dataIsLoaded = (state = false, action) => {
  switch (action.type) {
    case 'DATA_IS_LOADED':
      return action.status
    default:
      return state
  }
}

const addItemToList = (order, item, quantity) =>
  order.hasOwnProperty(item.id) ?
    {
      ...order[item.id],
      quantity: +order[item.id].quantity + +quantity
    } : {
      'product-id': item.id,
      'quantity': quantity,
      'unit-price': item.price,
      'total': item.price * quantity
    }



const orderApp = combineReducers({
  products,
  clients,
  orders,
  itemList,
  dataIsLoaded
 })

export default orderApp
