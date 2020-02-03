import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div>
                <form>
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
                </form>
                {/*länkt till register! och vica versa*/}
            </div>
        )
    }
}

export default Login