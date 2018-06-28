// @flow

import React from 'react';
import { listView } from './list-view.css';

type ListViewProps = {
    children: mixed,
}
export default ({ children }: ListViewProps) => (
    <div className={listView}>
        {children}
    </div>
);
