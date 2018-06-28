// @flow
import { login } from 'actions';
import { Button, Input, Loading, PublicContainer, Link } from 'components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from 'react-router-dom/Redirect';


type LoginType = {
    dispatch: (args: any) => void,
    authenticated: boolean,
    loading: boolean,
};

@connect(
    ({ auth: { authenticated, loading } }) => ({ authenticated, loading }),
    dispatch => ({ dispatch }),
)
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
        const { username, password } = this.state;
        if (username && password) this.props.dispatch(login(this.state));
    }
    render() {
        const { authenticated, loading } = this.props;
        if (loading) return <PublicContainer><Loading /></PublicContainer>;
        if (authenticated) return <Redirect to="/" />;
        return (
            <PublicContainer>
                <Input placeholder="username" type="text" onChange={this.inputChange('username')} />
                <Input placeholder="password" type="password" onChange={this.inputChange('password')} />
                <Button onClick={this.login}>
                    Login
                </Button>
                <p>
                    also you can
                    <Link to="/register">
                        register
                    </Link>
                </p>
            </PublicContainer>
        );
    }
}

