// @flow
// @ts-check

import { NotFound, Login, Register } from 'pages';


const privateRoutes = [
    {
        path: '/',
        component: null,
        icon: 'test',
        isPrivate: true,
        otherProps: {
            exact: true,
        },
    },
];
const publicRoutes = [
    {
        path: '/login',
        component: Login,
        otherProps: {
            // exact: true,
        },
    },
    {
        path: '/register',
        component: Register,
        otherProps: {
            // exact: true,
        },
    },
    // This needs to be last
    // It catches every other route which isn't declared
    {
        path: '*',
        component: NotFound,
        otherProps: {
            status: 404,
        },
    },
];

const routes = [
    ...privateRoutes,
    ...publicRoutes,
];

export default routes;
export { privateRoutes, publicRoutes };
