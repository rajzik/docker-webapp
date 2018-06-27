// @flow

import classnames from 'classnames';
import React from 'react';
import { input } from './input.css';


type InputProps = {
    className?: mixed,
};

export default function Input({ className, ...rest }: InputProps) {
    return (
        <input {...rest} className={classnames(input, className)} />
    );
}
Input.defaultProps = {
    className: '',
};
