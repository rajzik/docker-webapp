// @flow
// @ts-check

import { EXAMPLE_GET, EXAMPLE_LOADING } from 'constants';


async function Hello() {
    return {
        foo: 1,
        bar: true,
        baz: 'nonDefault message',
    };
}
function example() {
    return async (dispatch: (args: any) => void) => {
        dispatch({
            type: EXAMPLE_LOADING,
        });
        const data = await Hello();
        dispatch({
            type: EXAMPLE_GET,
            ...data,
        });
    };
}

function increment(current: number) {
    return (dispatch: (args: any) => void) => {
        dispatch({
            type: EXAMPLE_GET,
            foo: current + 1,
        });
    };
}

export { example, increment };
