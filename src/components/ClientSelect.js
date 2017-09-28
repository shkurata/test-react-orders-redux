import React from 'react'
import PropTypes from 'prop-types'

const ClientSelect = ({clients, selectedClient, changeClient}) => {
  return (
    <div>
      <label>Client: </label>
      <select onChange={(e) => changeClient(e.target.value)} value={selectedClient}>
        {Object.keys(clients).map(id =>
          <option key={id} value={id}>
          {clients[id].name}
          </option>)}
      </select>
    </div>
  )
}

PropTypes.ClientSelect = {
  clients: PropTypes.object,
  selectedClient: PropTypes.string,
  changeClient: PropTypes.func
}

export default ClientSelect
