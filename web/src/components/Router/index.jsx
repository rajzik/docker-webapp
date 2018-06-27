// @flow
// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { paths } from 'constants';
import { login } from 'actions';
import type { RouteProps, RouterProps } from 'types';


const mapPathsToRoutes = ({ path, component, otherProps }: RouteProps) => (
    <Route key={path} path={path} component={component} {...otherProps} />
);


const Root = ({ store }: RouterProps) => {
    // eslint-disable-next-line
    console.log(store.getState(), store.dispatch(login({ username: 'test1', password: 'test' })));
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
