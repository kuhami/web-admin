import React from 'react';
import ReactDOM from 'react-dom';
import { LayoutProvider } from 'react-page-layout';
import { Router, Route, browserHistory, hashHistory  } from 'react-router'
import App from './APP'
import Index from "./routes/index";
import Home from "./routes/home";
import Nav from "./routes/nav";



const routeConfig = [
    { path: '/',
        component: App,
        childRoutes: [
            { path: 'index', component: Index },
            { path: 'home', component: Home },
            // { path: 'nav', component: Nav },
            // { path: 'inbox',
            //     component: Inbox,
            //     childRoutes: [
            //         { path: '/messages/:id', component: Message },
            //         { path: 'messages/:id',
            //             onEnter: function (nextState, replaceState) {
            //                 replaceState(null, '/messages/' + nextState.params.id)
            //             }
            //         }
            //     ]
            // }
        ]
    }
];

ReactDOM.render(
    <LayoutProvider>
        <Router history={hashHistory} routes={routeConfig} />
    </LayoutProvider>,
    document.getElementById('app')
)

if (module.hot) {
    console.log('hot!!!!!!');
}