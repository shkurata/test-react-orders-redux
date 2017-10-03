import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addEmptyOrder, saveOrderOnServer } from '../actions'
import { getOrder } from '../reducers/orders'
import checkmark from '../images/checkmark.png'

const OrderList = ({orders, history, addEmptyOrder, saveOrderOnServer}) => {
 return (
   <div>
   <h1>Orders:</h1>
     <ul>
       {orders.map(order => (
         <li key={order.id}>
           <Link to={`${order.id}`}>
             Order #{order.id} from {order.customer} for total ${order.total}
           </Link>
           {!order.changed ? (
             <img src={checkmark} style={checkmarkStyle} alt="saved"/>
           ) : (
             <button disabled={!order.changed}
             onClick={()=> saveOrderOnServer(order.fullContent)}>
             Save
             </button>

           )}
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
   </div>
 )
}

const checkmarkStyle = {
  marginLeft: '10px',
  width: '12px'
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
      changed: state.orders[orderID].changed,
      fullContent: getOrder(state, orderID)
    }))
  }
}

export default withRouter(connect(mapStateToProps, { addEmptyOrder, saveOrderOnServer })(OrderList))
