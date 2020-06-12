import React, { useReducer, useState, useEffect } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case "add-todo":
            return {
                todos: [...state.todos,{ text: action.text, completed: false}],
                todoCount: state.todoCount + 1
            };
        case "toggle-todo":
            return{
                todos: state.todos.map((text, index) => 
                    index === action.index ? {...text, completed: !text.completed} : text
                ),
                todoCount: state.todoCount
            };
        case"clear-todo":
        return{
            todos: state.todos.filter((item) => {return !item.completed}),
        };
        case"update-todo-count":
        return{
            todos: state.todos,
            todoCount: state.todos.length
        };

        default:
            return state;
    }
}
function Todo() {
    const[{todos, todoCount}, dispatch] = useReducer(reducer, {
        todos: [],
        todoCount: 0
    })
    const [text, setText] =useState();

    return(
        <div className="todo-card">
            <form
            onSubmit={e => {
            e.preventDefault();
            dispatch({ type: "add-todo", text });
            setText("");
            }}
        >
            <input value={text} onChange={e => setText(e.target.value)} />
            <button>Add Todo</button>
        </form>
        <div>number of todos: {todoCount}</div>
        {todos.map((text, index) => (
            <div
            key={text.text}
            onClick={() => dispatch({ type: "toggle-todo" , index })}
            style={{
                textDecoration: text.completed ? "line-through" : ""
            }}
            >
            {text.text}
            </div>    
        ))}
            <button onClick={() =>{
                dispatch({ type: "clear-todo",  });
                dispatch({ type: "update-todo-count",})
            } }>clear todos</button>
        </div>
    );
}

export default Todo;