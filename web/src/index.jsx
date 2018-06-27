// @flow
// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Router } from './components';

import { init } from './utilities';


// This needs to be latest import!
import './index.css';

// Using promise for dynamic import in init, where dependencies are imported depend on env!
init().then(({ store }) => {
    const element = document.getElementById('root');
    if (element !== null) {
        ReactDOM.render(
            (
                <Router store={store} />
            ), element,
        );
    }
    registerServiceWorker();
});
