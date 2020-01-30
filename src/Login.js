import React from 'react';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <h3>Sign In</h3>
                <input
                    type='email'
                    placeholder='E-mail'
                />
                <input 
                    type='password'
                    placeholder='Password'
                />
                <input 
                    type='submit'
                    value='Sign In'
                />
            </div>
        )
    }
}