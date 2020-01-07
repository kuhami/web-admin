import App from '../src/layouts/APP'
import Index from "../src/routes/index";
import Index2 from "../src/routes/index2";
import Home from "../src/routes/home";
import Nav from "../src/routes/nav";
import noPages from "../src/routes/NoPages";
const routeConfig = [
    {   path: '/',
        component: App,
        childRoutes: [
            { path: '/', redirect: '/home' },
            { path: 'index', component: Index },
            { path: 'home', component: Home },
            { path: 'index2', component: Index2 },
            { path: 'nav', component: Nav },

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
            {path: '/*', component: noPages}
        ]
    },
];

export default routeConfig