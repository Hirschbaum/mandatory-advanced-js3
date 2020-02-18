import React from 'react';
import { updateToken, token$ } from './store';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import MaterialIcon, { colorPalette } from 'material-icons-react';
import jwt from 'jsonwebtoken';

class Todos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: token$.value,
            todos: [],
            todoInput: '',
            usermail: '',
        }

        this.subscription = null;
    }

    componentDidMount() {

        this.subscription = token$.subscribe(token => {
            if (token === null) {
                this.setState({ token: token });
            } else {
                const decoded = jwt.decode(token);
                console.log(decoded);
                this.setState({ usermail: decoded.email, token: token });
            }
        })

        axios.get('http://3.120.96.16:3002/todos', {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                //console.log(response.data.todos);
                this.setState({ todos: response.data.todos }) //response is an array!
            })
            .catch(err => {
                console.log('Error: GET todos', err);
                updateToken(null)
            })
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    addTodo = (e) => {
        e.preventDefault();
        axios.post('http://3.120.96.16:3002/todos', { content: this.state.todoInput }, {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                this.setState({ todos: [...this.state.todos, response.data.todo] }); //update the state todos with the TODO from the server
            })
            .catch(err => {
                console.log('Error: POST of todo', err);
            })
    }

    deleteTodo = (id) => {
        axios.delete('http://3.120.96.16:3002/todos/' + id, {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                //console.log(response); //data is an empty string
                this.setState({ todos: this.state.todos.filter(todo => id !== todo.id) }); //filter all the todo items, which has not the id of the deleted todo
            })
            .catch(err => {
                console.log('Error: POST of todo', err);
            })
    }

    logOut = () => {
        updateToken(null);
    }

    onChange = (e) => {
        this.setState({ todoInput: e.target.value })
    }

    render() {
        console.log('RENDER', this.state.todos);
        if (!this.state.token) return <Redirect to='/login' />
        //console.log(this.state.todos);
        
        return (
            <div className='todos-container'>

                <header>
                    <div className="header-firstrow">

                        <div className='todos-logo-container'>
                            <div className="todos-logo"> do</div>
                            <h3>todos</h3>
                        </div>

                        <div className="logout-container">
                            <p className='user-email'>{this.state.usermail}</p>
                            <button onClick={this.logOut} className='logout-button'><MaterialIcon icon='exit_to_app' color={colorPalette.amber._900} size='medium' /></button>
                        </div>
                    </div>

                </header>


                <div className='todos-main'>
                    <form onSubmit={this.addTodo} className='todos-form'>
                        <input
                            className='todos-input'
                            type='text'
                            placeholder='to do...'
                            value={this.state.todoInput}
                            onChange={this.onChange}
                        />
                        <input
                            type='submit'
                            value='Add'
                            className='todos-add-button'
                        />
                    </form>

                    <ul className='todos-list'>
                        {this.state.todos.map(x => {
                            return (
                                <li key={x.id}> 
                                    <span>{x.content}</span>
                                    <span onClick={() => this.deleteTodo(x.id)} className='delete-todo'>
                                        <MaterialIcon icon='check' color={colorPalette.amber._700} />
                                    </span>
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div>
        )
    }
}

export default Todos