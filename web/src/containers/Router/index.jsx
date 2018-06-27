// @flow
// @ts-check

import { PrivateRoute } from 'components';
import { paths } from 'constants';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import type { RouteProps } from 'types';


const curryMeWithAuth = (authenticated: boolean) => ({
    path, component, isPrivate = false, otherProps,
}: RouteProps) => (
    isPrivate ?
        <PrivateRoute
            key={path}
            path={path}
            component={component}
            authenticated={authenticated}
            {...otherProps}
        /> :
        <Route key={path} path={path} component={component} {...otherProps} />
);

type RouterProps = {
    authenticated: boolean,
};
@connect(({ auth: { authenticated } }) => ({ authenticated }))
export default class Router extends Component<RouterProps> {
    render() {
        const { authenticated } = this.props;
        const mapPathsToRoutes = curryMeWithAuth(authenticated);
        return (
            <BrowserRouter>
                <Switch>
                    {
                        paths.map(mapPathsToRoutes)
                    }
                </Switch>
            </BrowserRouter>
        );
    }
}

