import React from 'react';

export default class Register extends React.Component {
    render() {
        return(
            <div>
                <h3>Register</h3>
                <input
                    type='email'
                    placeholder='Email'
                />
                <input 
                    type='password'
                    placeholder='Password'
                />
                <input 
                    type='submit'
                    value='Register'
                />
            </div>
        )
    }
}