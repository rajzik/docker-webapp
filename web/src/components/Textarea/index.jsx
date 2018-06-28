// @flow

import React from 'react';

import { textArea } from './textarea.css';

export default function Textarea(props: any) {
    return (
        <textarea {...props} className={textArea} />
    );
}

