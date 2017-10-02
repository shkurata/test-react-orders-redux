import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import OrderContainer from './OrderContainer'
import OrderList from './OrderList'
import { loadData } from '../actions'

class App extends Component {
  componentDidMount() {
    if (!this.props.dataIsLoaded) {
      this.props.dispatch(loadData())
    }
  }
  render() {
    if (!this.props.dataIsLoaded) return null
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={OrderList} />
          <Route path="/:order_id" render={({match}) => <OrderContainer orderId={match.params.order_id}/>} />
        </Switch>
      </Router>
    )
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
