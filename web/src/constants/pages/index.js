// @flow
// @ts-check

import { NotFound, LoginPage, RegisterPage, MainPage } from 'pages';


const privateRoutes = [
    {
        path: '/',
        component: MainPage,
        icon: 'test',
        isPrivate: true,
        otherProps: {
            exact: true,
        },
    },
    {
        path: '/:id(\\d+)',
        component: MainPage,
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
        component: LoginPage,
        otherProps: {
            exact: true,
        },
    },
    {
        path: '/register',
        component: RegisterPage,
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
