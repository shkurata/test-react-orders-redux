import React from 'react'
import PropTypes from 'prop-types'

const AddItem = ({products, addItem}) => {
  let selected, quantity
  return (
    <div>
      <select ref={sel => {selected = sel}}>
        {Object.keys(products).map(id =>
          <option key={id} value={id}>
            {products[id].description}
          </option>)}
      </select>
      <input type="number" defaultValue="1" ref={qnty => {quantity = qnty}}/>
      <button onClick={() => {
        addItem(products[selected.value], quantity.value)
      }}>
        Add item
      </button>
    </div>
  )
}

PropTypes.AddItem = {
  products: PropTypes.object,
  addItem: PropTypes.func
}

export default AddItem
