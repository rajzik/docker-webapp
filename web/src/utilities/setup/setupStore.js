// @flow
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import AppReducer from 'reducers';


const middleWares = [
    thunkMiddleware,
];

async function setupStore() {
    if (process.env.NODE_ENV === 'development') {
        const logger = await import('redux-logger');
        middleWares.push(logger.default);
    }
    return createStore(AppReducer, applyMiddleware(...middleWares));
}

export default setupStore;
