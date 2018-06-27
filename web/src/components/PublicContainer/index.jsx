// @flow
import React from 'react';
import { innerContainer, mainContainer } from './container.css';

type PublicContainerProps = {
    children: mixed,
};

export default function PublicContainer({ children }: PublicContainerProps) {
    return (
        <div className={mainContainer}>
            <div className={innerContainer}>
                {children}
            </div>
        </div>
    );
}
