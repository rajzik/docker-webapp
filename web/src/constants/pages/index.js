// @flow
// @ts-check

import { NotFound } from 'pages';


const privateRoutes = [
    {
        path: '/',
        component: null,
        icon: 'vision',
        otherProps: {
            exact: true,
        },
        linkProps: {
            iconClassName: 'vision-icon',
        },
    },
];
const publicRoutes = [
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
