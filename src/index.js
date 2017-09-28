import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import orderApp from './reducers'
import { loadData } from './actions'
import App from './containers/App';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

let store = createStore(
  orderApp,
  applyMiddleware(...middleware)
)

store.dispatch(loadData())
  .then(() => {
    // console.log('everthing loaded!')
    // console.log(store.getState())

    ReactDOM.render(
      <Provider store={store}>
      <App />
      </Provider>
      , document.getElementById('root'));

  })

// setTimeout(()=>console.log(store.getState()), 5000)