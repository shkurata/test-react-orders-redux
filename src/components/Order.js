import React from 'react'
import PropTypes from 'prop-types'
import AddItem from './AddItem'
import ItemList from './ItemList'
import ClientSelect from './ClientSelect'

const Order = ({order, clients, products, addItem, removeItem, changeClient}) => {
  return (
    <div>
    <h1>Order #{order.id}</h1>
    <ClientSelect clients={clients}
                  selectedClient={order['customer-id']}
                  changeClient={changeClient}/><br/>
    <AddItem products={products} addItem={addItem}/>
    <ItemList items={order.items} removeItem={removeItem}/>
    </div>
  )
}

PropTypes.AddItem = {
  products: PropTypes.object,
  order: PropTypes.object,
  clients: PropTypes.object,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  changeClient: PropTypes.func
}

export default Order
