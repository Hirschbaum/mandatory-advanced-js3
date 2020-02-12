import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {token$, updateToken} from './store';
import jwt from 'jsonwebtoken';
import Header from './Header';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          email: '',
          password: '',
          error: false,
          token: token$.value,
        };
    
      }
    
      componentDidMount() {
        this.subscription = token$.subscribe(token => {
            console.log(token);
          this.setState({token: token});
        }); 
      }
    
    componentWillUnmount() {
        this.subscription.unsubscribe();
      }
    
      emailHandler = (e) => {
        this.setState({email: e.target.value});
      }
    
      passwordHandler = (e) => {
        this.setState({password: e.target.value});
      }
    
      onSubmit = (e) => {
        e.preventDefault();
        let loginData = {
          email: this.state.email,
          password: this.state.password,
        };
    
        axios.post('http://3.120.96.16:3002/auth', loginData)
          .then(response => {
            this.setState({error: false});
            const decoded = jwt.decode(response.data.token);
            console.log(decoded); 
            updateToken(response.data.token);
          })
          .catch(err => {
            this.setState({error: true});
            console.error(err);
          });
      }
    
    render() {
        if (this.state.token) {
            return <Redirect to='/' />; 
        }

        let errorMessage = null;
        if (this.state.error) {
            errorMessage = 'Invalid login. Try again or create an account.';
        }

        return (
            <div>
              <Header />
                <form onSubmit={this.onSubmit} className='login-page'>
                   
                    <p className='error-message'>{errorMessage}</p>
                    <input
                        type='email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.emailHandler}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.passwordHandler}
                    />
                    <input
                        type='submit'
                        value='Log In'
                    />
                </form>
            </div>
        )
    }
}

export default Login