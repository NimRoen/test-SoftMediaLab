import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { Normalize } from 'styled-normalize';

import App from './components/App';
import './index.scss';

const reducers = {
  form: formReducer,
};

const store = createStore(combineReducers(reducers));

ReactDOM.render(
  <Fragment>
    <Provider store={store}>
      <Normalize />
      <App />
    </Provider>
  </Fragment>,
  document.getElementById('root')
);
