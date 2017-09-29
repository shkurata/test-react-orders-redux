import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import OrderContainer from './OrderContainer'
import { loadData } from '../actions'

class App extends Component {
  componentDidMount() {
    if (!this.props.dataIsLoaded) {
      this.props.dispatch(loadData())
    }
  }
  render() {
    if (!this.props.dataIsLoaded) return null
    return <OrderContainer orderId={"2"}/>
  }
}

PropTypes.App = {
  dataIsLoaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    dataIsLoaded: state.dataIsLoaded
  }
}

export default connect(mapStateToProps)(App)
