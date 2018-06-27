// @flow
// @ts-check

import { PrivateRoute } from 'components';
import { paths } from 'constants';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import type { RouteProps, RouterProps } from 'types';


const curryMeWithAuth = (authenticated: boolean) => ({
    path, component, isPrivate = false, otherProps,
}: RouteProps) => (
    isPrivate ?
        <PrivateRoute
            path={path}
            component={component}
            authenticated={authenticated}
            {...otherProps}
        /> :
        <Route key={path} path={path} component={component} {...otherProps} />
);


const Root = ({ store }: RouterProps) => {
    // console.log(store.getState(), );
    // store.dispatch(login({ username: 'test1', password: 'test' }))
    const state = store.getState();
    const mapPathsToRoutes = curryMeWithAuth(state.auth.authenticated);
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    {
                        paths.map(mapPathsToRoutes)
                    }
                </Switch>
            </Router>
        </Provider>
    );
};

export default Root;
