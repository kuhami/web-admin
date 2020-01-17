import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, hashHistory  } from 'react-router';
import routeConfig from './containers/routeConfig';
import configureStore from './store/configureStore'

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routeConfig} />
    </Provider>,
    document.getElementById('app')
);


if (module.hot && process.env.NODE_ENV === 'development') {
    //console.log('hot!!!!!!');
}