// @flow
import { login } from 'actions';
import { Button, Input } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import Redirect from 'react-router-dom/Redirect';
import { innerContainer, mainContainer } from './login.css';

type LoginType = {
    dispatch: (args: any) => void,
    authenticated: boolean,
};

@connect(({ auth: { authenticated } }) => ({ authenticated }), dispatch => dispatch)
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
    login = () => {
        this.props.dispatch(login(this.state));
    }
    render() {
        const { authenticated } = this.props;
        if (authenticated) return <Redirect to="/" />;
        return (
            <div className={mainContainer}>
                <div className={innerContainer}>
                    <Input type="text" onChange={this.inputChange('username')} />
                    <Input type="password" onChange={this.inputChange('password')} />
                    <Button onClick={this.login}>
                        Login
                    </Button>
                </div>
            </div>
        );
    }
}

