import React, { Component } from 'react';

/**
 * Demo of an unauthenticated API call.
 */
class UnprotectedCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: false
    };
  }

  componentDidMount() {
    this.loading = true;

    fetch('/api/db/unprotected')
      .then(response => {
        this.loading = false;
        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
        this.setState({'todos': json.todos});
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  render() {
    let todoList = this.state.todos.map(function(todo) {
      return <li key={todo._id}>{todo.task}</li>;
    });

    if (this.loading) {
      return <div>loading...</div>
    } else {
      return (
        <div className="Db">
          <h1>todos from an unprotected db call</h1>
          <ul>
            {todoList}
          </ul>
        </div>
      );
    }

  }
}

export default UnprotectedCall;