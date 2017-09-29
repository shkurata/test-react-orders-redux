import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import OrderContainer from './OrderContainer'
import { loadData } from '../actions'

class App extends Component {
  componentDidMount() {
    if (!this.props.isDataLoaded) {
      this.props.dispatch(loadData())
    }
  }

  render() {
    return (
      <div>
        {this.props.isDataLoaded ? (
          <OrderContainer orderId={"2"}/>
        ) : (
          <h1>Loading data...</h1>
        )}
      </div>
    )
  }
}

PropTypes.App = {
  isDataLoaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    isDataLoaded: state.isDataLoaded
  }
}

export default connect(mapStateToProps)(App)
