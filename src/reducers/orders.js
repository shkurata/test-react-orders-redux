import { transformArray } from './clients'
import { removeItemFromObject } from './itemlists'

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
      case 'SAVE_ORDER_ON_SERVER':
        sendOrderToServer(action.order)
        return {
          ...state,
          [action.order.id]: {
            ...state[action.order.id],
            changed: false
          }
        }
    default:
      return state
  }
}

const sendOrderToServer = order => {
  fetch('http://localhost:1112/save-order', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(order)
  }).then(response => {
    console.log(response);
  }).then(data => {
    console.log(data);
  })
}

export const getOrder = (state, orderId) => {
  const { changed, ...rest } = state.orders[orderId]
  return {
    ...rest,
    items: Object.keys(state.itemList[orderId])
      .map(itemId => state.itemList[orderId][itemId])
  }
}

const removeItemsFromOrders = orders =>
  transformArray(orders.map(order => removeItemFromObject(order, 'items')))

export default orders
