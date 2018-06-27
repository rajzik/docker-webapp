// @flow
// @ts-check

import { Router } from 'containers';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { init } from 'utilities';
// This needs to be latest import!
import './index.css';
import registerServiceWorker from './registerServiceWorker';


// Using promise for dynamic import in init, where dependencies are imported depend on env!
init().then(({ store }) => {
    const element = document.getElementById('root');
    if (element !== null) {
        ReactDOM.render(
            (
                <Provider store={store}>
                    <Router />
                </Provider>
            ), element,
        );
    }
    registerServiceWorker();
});
