// @flow
import { register } from 'actions';
import { Button, Input } from 'components';
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import Redirect from 'react-router-dom/Redirect';
import { innerContainer, mainContainer } from './login.css';

type RegisterType = {
    dispatch: (args: any) => void,
    authenticated: boolean,
};

@connect(({ auth: { authenticated } }) => ({ authenticated }), dispatch => dispatch)
export default class Register extends Component<RegisterType> {
    state = {
        username: '',
        password: '',
        email: '',
    }

    inputChange = (name: string) => ({ target: { value } }) => {
        this.setState({
            [name]: value,
        });
    }
    Register = () => {
        const { username, password, email } = this.state;
        if (username && password && email) this.props.dispatch(register(this.state));
    }
    render() {
        const { authenticated } = this.props;
        if (authenticated) return <Redirect to="/" />;
        return (
            <div className={mainContainer}>
                <div className={innerContainer}>
                    <Input type="text" onChange={this.inputChange('username')} />
                    <Input type="password" onChange={this.inputChange('password')} />
                    <Input type="text" onChange={this.inputChange('email')} />
                    <Button onClick={this.Register}>
                        Register
                    </Button>
                </div>
            </div>
        );
    }
}

