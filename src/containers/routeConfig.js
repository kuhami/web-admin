import App from '../layouts/APP'
import Index from "../routes";
import Index2 from "../routes/index2";
import Home from "../routes/Home/index";
import Nav from "../routes/nav";
import noPages from "../routes/NoPages";
import Login from "../layouts/Login";

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
            //{path: '/*', component: noPages}
        ]
    },
    /**登录页面**/
    {path: '/login', component: Login},
    /**404**/
    {path: '/*', component: noPages}
];

export default routeConfig