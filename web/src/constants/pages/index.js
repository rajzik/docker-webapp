// @flow
// @ts-check

import { NotFound } from 'pages';


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
        component: NotFound,
        otherProps: {
            exact: true,
        },
    },
    {
        path: '/register',
        component: NotFound,
        otherProps: {
            exact: true,
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
