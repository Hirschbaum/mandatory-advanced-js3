import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
                this.setState({ error: false }); //201 from server
                //updateToken(response.data.token);
            })
            .catch(err => {
                this.setState({ error: true });
                console.error(err, 'Register: error');
            });
    }


    render() {
        return (
            <div>
                <h3>Register</h3>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='email'
                        onChange={this.emailHandler}
                        placeholder='Email'
                    />
                    <input
                        type='password'
                        onChange={this.passwordHandler}
                        placeholder='Password'
                    />
                    <input
                        type='submit'
                        value='Register'
                    />
                </form>
            </div>
        )
    }
}

export default Register