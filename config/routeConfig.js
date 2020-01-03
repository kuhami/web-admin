// const routeConfig = [
//     { path: '/',
//         component: App,
//         indexRoute: { component: Dashboard },
//         childRoutes: [
//             { path: 'about', component: About },
//             { path: 'inbox',
//                 component: Inbox,
//                 childRoutes: [
//                     { path: '/messages/:id', component: Message },
//                     { path: 'messages/:id',
//                         onEnter: function (nextState, replaceState) {
//                             replaceState(null, '/messages/' + nextState.params.id)
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// ];
import App from '../src/APP'
import Index from "../src/routes/index";
import Index2 from "../src/routes/index2";
import Home from "../src/routes/home";
import Nav from "../src/routes/nav";
const routeConfig = [
    { path: '/',
        component: App,
        childRoutes: [
            { path: 'index', component: Index },
            { path: 'home', component: Home },
            { path: 'index2', component: Index2 },
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

export default routeConfig