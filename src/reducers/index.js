import {combineReducers} from 'redux'
import itemList from './itemlists'
import clients from './clients'
import products from './products'
import orders from './orders'

const dataIsLoaded = (state = false, action) => {
  switch (action.type) {
    case 'DATA_IS_LOADED':
      return action.status
    default:
      return state
  }
}

const orderApp = combineReducers({
  products,
  clients,
  orders,
  itemList,
  dataIsLoaded
 })

export default orderApp
