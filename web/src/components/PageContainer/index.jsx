// @flow
import React from 'react';
import type { BasicComponent } from 'types';

import { pageContainer } from './pagecontainer.css';


export default function PageContainer({ children }: BasicComponent) {
    // eslint-disable-next-line
    console.log(children);
    return (
        <div className={pageContainer} />
    );
}
