import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addEmptyOrder } from '../actions'

const OrderList = ({orders, history, addEmptyOrder}) => {
 return (
   <div>
   <h1>Orders:</h1>
     <ul>
       {orders.map(order => (
         <li key={order.id}>
           <Link to={`${order.id}`}>
             Order #{order.id} from {order.customer} for total ${order.total}
           </Link>
           <button disabled={!order.changed}>Save</button>
         </li>
       )
     )}
     </ul>
       <button onClick={()=> {
           const orderID = orders.length + 1 + ''
          addEmptyOrder(orderID)
          history.push(orderID)
       }}>
         Add new order
       </button>
      <button>Save orders</button>
   </div>
 )
}

PropTypes.OrderList = {
  orders: PropTypes.array
}

const mapStateToProps = state => {
  return {
    orders: Object.keys(state.orders).map(orderID => ({
      id: orderID,
      customer: state.clients[state.orders[orderID]['customer-id']].name,
      total: state.orders[orderID].total,
      changed: state.orders[orderID].changed
    }))
  }
}

export default withRouter(connect(mapStateToProps, { addEmptyOrder })(OrderList))
