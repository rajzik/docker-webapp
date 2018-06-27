// @flow

import classnames from 'classnames';
import React from 'react';
import { button } from './button.css';


type ButtonType = {
    children: mixed,
    onClick: () => void
};

export default function Button({ children, onClick }: ButtonType) {
    return (
        <button className={classnames(button)} onClick={onClick}>
            {children}
        </button>
    );
}
