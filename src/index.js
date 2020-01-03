import React from 'react';
import ReactDOM from 'react-dom';
import { LayoutProvider } from 'react-page-layout';
import { Router, hashHistory  } from 'react-router';
import routeConfig from '../config/routeConfig';


ReactDOM.render(
    <LayoutProvider>
        <Router history={hashHistory} routes={routeConfig} />
    </LayoutProvider>,
    document.getElementById('app')
);

if (module.hot) {
    console.log('hot!!!!!!');
}