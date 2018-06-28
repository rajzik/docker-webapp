// @flow

import classnames from 'classnames';
import React from 'react';
import styles from './button.css';


type ButtonType = {
    children: mixed,
    onClick: () => void,
    type: string
};

export default function Button({ children, onClick, type = 'button' }: ButtonType) {
    return (
        <button className={classnames(styles[type])} onClick={onClick}>
            {children}
        </button>
    );
}

export function FlatButton(props) {
    return <Button {...props} type="flat" />;
}
