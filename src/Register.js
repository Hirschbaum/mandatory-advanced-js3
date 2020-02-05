import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false,
            redirectToLogin: false,
        }
    }
    
    emailHandler = (e) => {
        this.setState({ email: e.target.value })
    }

    passwordHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        let registerData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://3.120.96.16:3002/register', registerData)
            .then(response => {
                console.log('yeap', response.data.email);
                this.setState({redirectToLogin: true});
            })
            .catch(err => {
                this.setState({ error: true });
                console.error(err, 'Register: error');
            });
    }


    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to='/login' />;
        }

        let errorMessage = null;
        if (this.state.error) {
            errorMessage = 'Error by registering';
        } 

        return (
            <div>
                <p className='error-message'>{errorMessage}</p>
                <h3>Register</h3>

                <form onSubmit={this.onSubmit}>
                    <input
                        type='email'
                        onChange={this.emailHandler}
                        placeholder='Email'
                        value={this.state.email}
                    />
                    <input
                        type='password'
                        onChange={this.passwordHandler}
                        placeholder='Password'
                        value={this.state.password}
                    />
                    <input
                        type='submit'
                        value='Register'
                    />
                </form>
                <br></br>
                <Link to='/login' className='links'>Login</Link>
            </div>
        )
    }
}

export default Register