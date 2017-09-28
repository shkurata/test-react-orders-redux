import { connect } from 'react-redux'
import ItemList from '../components/ItemList'
import { removeItem } from '../actions'

const mapStateToProps = state => {
  return {
    items: Object.keys(state.itemList).map(id => ({
      id,
      quantity: state.itemList[id],
      price: state.products[id].price,
      total: (state.itemList[id] * state.products[id].price)
        .toFixed(2),
      description: state.products[id].description
    }))
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (itemId) => {
      dispatch(removeItem(itemId))
    }
  }
}


const ItemsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemList)

export default ItemsList
