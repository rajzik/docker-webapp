// @flow

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import type { RouteProps } from 'types';

export default function PrivateRoute({
    authenticated, path, component: Component, otherProps,
}: RouteProps) {
    return (
        <Route
            path={path}
            {...otherProps}
            render={(props: any) => (
                authenticated ?
                    <Component {...props} /> :
                    <Redirect to="/login" />
            )}
        />
    );
}
