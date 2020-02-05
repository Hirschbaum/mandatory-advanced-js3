import React from 'react';
import { updateToken, token$ } from './store';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import MaterialIcon, {colorPalette} from 'material-icons-react';

class Todos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: token$.value,
            todos: [],
            todoInput: '',
        }
    }

    componentDidMount() {
        token$.subscribe(token => {
            this.setState({ token: token });
        })

        axios.get('http://3.120.96.16:3002/todos', {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                console.log(response.data.todos);
                this.setState({ todos: response.data.todos }) //response is an array!
            })
            .catch(err => {
                console.log('Error: GET todos', err);
                updateToken(null)
            })
    }

    addTodo = () => {
        axios.post('http://3.120.96.16:3002/todos', { content: this.state.todoInput }, {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            }
        })
            .then(response => {
                this.setState({ todos: [...this.state.todos, response.data.todos] }); //update the state todos with the todos from the server
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

    logOut = (e) => {
        updateToken(null);
    }

    onChange = (e) => {
        this.setState({ todoInput: e.target.value })
    }

    render() {
        if (!this.state.token) return <Redirect to='/login' />
        console.log(this.state.todos);
        return (
            <div>
                <header className='header-todos'>
                    <h2>Todos</h2>
                    <button onClick={this.logOut} className='logout-button'><MaterialIcon icon='exit_to_app'/></button>
                </header>
                <div className='todos-page'>
                    <form onSubmit={this.addTodo} className='form-todo'>
                        <input
                            type='text'
                            placeholder='to do...'
                            value={this.state.todoInput}
                            onChange={this.onChange} />
                        <input type='submit' value='+' className='add-button' />
                    </form>
                    <ul>
                        {this.state.todos.map(x => {
                            return (
                                <li key={x.id}>
                                    <span>{x.content}</span>
                                    <span onClick={() => this.deleteTodo(x.id)} className='delete-todo'>
                                        <MaterialIcon icon='check' />
                                        {/*<button
                                            className='delete-todo'
                                            onClick={() => this.deleteTodo(x.id)}> X
                                        </button>*/}
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