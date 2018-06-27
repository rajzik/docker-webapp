// @flow
// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { paths } from 'constants';
import { PageContainer } from 'components';
import type { RouteProps, RouterProps } from 'types';


const mapPathsToRoutes = ({ path, component, otherProps }: RouteProps) => (
    <Route key={path} path={path} component={component} {...otherProps} />
);

const Root = ({ store }: RouterProps) => (
    <Provider store={store}>
        <Router>
            <PageContainer>
                <Switch>
                    {
                        paths.map(mapPathsToRoutes)
                    }
                </Switch>
            </PageContainer>
        </Router>
    </Provider>
);

export default Root;
