// @flow

import React from 'react';

import { saving } from './loading.css';

export default function Loading() {
    return (
        <div>
            Loading
            <span className={saving}>.</span>
            <span className={saving}>.</span>
            <span className={saving}>.</span>
        </div>
    );
}
