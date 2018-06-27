// @flow
import { login } from 'actions';
import { Button, Input, PublicContainer } from 'components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';


type LoginType = {
    dispatch: (args: any) => void,
    authenticated: boolean,
    auth: any,
};

@connect(({ auth: { authenticated } }) => ({ authenticated }), dispatch => ({ dispatch }))
export default class Login extends Component<LoginType> {
    state = {
        username: '',
        password: '',
    }

    inputChange = (name: string) => ({ target: { value } }) => {
        this.setState({
            [name]: value,
        });
    }
    lgn = () => {
        const { username, password } = this.state;
        if (username && password) this.props.dispatch(login(this.state));
    }
    render() {
        const { authenticated } = this.props;
        if (authenticated) return <Redirect to="/" />;
        return (
            <PublicContainer>
                <Input type="text" onChange={this.inputChange('username')} />
                <Input type="password" onChange={this.inputChange('password')} />
                <Button onClick={this.lgn}>
                    Login
                </Button>
            </PublicContainer>
        );
    }
}

