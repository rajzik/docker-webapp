// @flow
// @ts-check
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { example, increment } from 'actions';
import { Button } from 'components';

import type { exampleType } from 'types';

@connect(({ example: exampleData }) => (exampleData))
export default class Example extends Component<exampleType> {
    constructor(props: exampleType) {
        super(props);
        props.dispatch(example());
    }

    increment = () => {
        this.props.dispatch(increment(this.props.foo));
    }
    render() {
        const { foo } = this.props;
        return (
            <div>
                <Button test={foo} onClick={this.increment} />
                <FormattedMessage id="header.welcome" />
            </div>
        );
    }
}
