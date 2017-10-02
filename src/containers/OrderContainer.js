import { connect } from 'react-redux'
import { removeItem, addItem, changeClient } from '../actions'
import Order from '../components/Order'

const mapStateToProps = (state, ownProps) => {
  const orderItems = state.itemList[ownProps.orderId]
  const orderFields = state.orders[ownProps.orderId] ?
    {
      ...state.orders[ownProps.orderId],
      items: Object.keys(orderItems).map(id => ({
        id,
        quantity: orderItems[id].quantity,
        price: state.products[id].price,
        total: (orderItems[id].quantity * state.products[id].price)
          .toFixed(2),
        description: state.products[id].description
      }))
    } : {
      id: ownProps.orderId,
      items: []
    }
  return {
    order: orderFields,
    clients: state.clients,
    products: state.products
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeItem: (itemId, itemTotal) => {
      dispatch(removeItem(ownProps.orderId, itemId, itemTotal))
    },
    addItem: (item, quantity) => {
      dispatch(addItem(ownProps.orderId, item, quantity))
    },
    changeClient: (clientId) => {
      dispatch(changeClient(ownProps.orderId, clientId))
    }
  }
}


const OrderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)

export default OrderContainer
