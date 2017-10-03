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

    export const removeItemFromObject = (obj, itemName) => {
      let {[itemName]: omit, ...res} = obj
      return res
    }

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


export default itemList
