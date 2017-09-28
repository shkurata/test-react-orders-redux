import { connect } from 'react-redux'
import { addItem } from '../actions'
import AddItem from '../components/AddItem'

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (itemId, quantity) => {
      dispatch(addItem(itemId, quantity))
    }
  }
}

const SelectItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem)

export default SelectItems
