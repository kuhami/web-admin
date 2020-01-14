import React from 'react';
import ReactDOM from 'react-dom';
import { LayoutProvider } from 'react-page-layout';
import { Provider } from 'react-redux'
import { Router, hashHistory  } from 'react-router';
import routeConfig from '../config/routeConfig';
import configureStore from './store/configureStore'

const store = configureStore();
console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
            <Router history={hashHistory} routes={routeConfig} />
    </Provider>,
    document.getElementById('app')
);


if (module.hot && process.env.NODE_ENV === 'development') {
    //console.log('hot!!!!!!');
}