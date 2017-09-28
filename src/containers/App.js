import React, { Component } from 'react'
// import SelectItems from '../containers/SelectItems'
// import ItemsList from '../containers/ItemsList'
import OrderContainer from './OrderContainer'

class App extends Component {
  render() {
    return (
      <div>

        <OrderContainer orderId={"2"}/>
      </div>
    )
  }
}

export default App
