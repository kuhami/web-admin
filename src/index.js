import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import APP from "./print";


ReactDOM.render(
    <APP/>,
    document.getElementById('app')
)

if (module.hot) {
    console.log('hot!!!!!!')
}