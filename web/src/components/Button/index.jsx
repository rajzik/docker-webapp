// @flow

import React from 'react';
import classnames from 'classnames';

import { button } from './button.css';

type ButtonType = {
    test: number,
    onClick: () => void
};

export default function Button({ test, onClick }: ButtonType) {
    return (
        <button className={classnames(button, 'test')} onClick={onClick}>
            {test}
        </button>
    );
}
