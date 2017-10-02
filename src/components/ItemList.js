import React from 'react'
import PropTypes from 'prop-types'
import '../style/style.min.css'


const ItemList = ({items, removeItem}) => {
  let total = items.reduce((a, b) => a + +b.total, 0).toFixed(2) || 0;
  return (
    <div>
      <h3>Total: ${total}</h3>
      <table className="table">
      <thead>
        <tr>
          <th className="left-aligned">Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item =>
          <tr key={item.id}>
            <td className="left-aligned">{item.description}</td>
            <td>{item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.total}</td>
            <td>
              <button onClick={() => removeItem(item.id, item.total)}>
                Remove item
              </button>
            </td>
          </tr>
        )}
      </tbody>
      </table>
    </div>
  )
}

PropTypes.ItemList = {
  items: PropTypes.array
}

export default ItemList
