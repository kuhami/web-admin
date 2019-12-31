import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import App from './APP'

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)

if (module.hot) {
    console.log('hot!!!!!!')
}