// @flow
import type { Store } from 'redux';
import type { Match, Location, RouterHistory } from 'react-router-dom';


type RouteProps = {
    path: string,
    component: any,
    otherProps: mixed
};

type RouterProps = {
    store: Store,
};

type WithRouterProps = {
    match: Match,
    location: Location,
    history: RouterHistory,
}

export type {
    RouteProps,
    RouterProps,
    WithRouterProps,
};
