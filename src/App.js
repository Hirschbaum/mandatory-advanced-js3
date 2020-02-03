import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Todos from './Todos';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path='/' component={Todos}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
        </Router>
      </div>
    );
  }
}