// @flow
import setupStore from './setupStore';

async function init() {
    const store = await setupStore();
    return {
        store,
    };
}

export default init;
