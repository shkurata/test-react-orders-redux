const initialState = {
  itemList: {},
  itemToAdd: {
    selectedProduct: '',
    quantity: 1
  }
}


export const addItemParams = (state = initialState.itemToAdd, action) => {
  switch (action.type) {
    case 'SELECT_ITEM_FROM_PRODUCTS':
      return {
        ...state,
        selectedProduct: action.value,
      }
    case 'SELECT_QNTY_FOR_PRODUCT':
      return {
        ...state,
        quantity: value
      }
    default:
      return state;
}

export const listItems = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_LIST':
      return {
        ...state,
        itemList: {
          ...state.itemList,
          [state.itemToAdd.selectedProduct]: products.find(product => product.id === state.itemToAdd.selectedProduct)
        }
      }
    default:
      return state;
  }
}
