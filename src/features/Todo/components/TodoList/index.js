/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './styles.scss'

const TodoList = (props) => {
    const {todoList, onTodoClick} = props
    const handleTodoClick = (todo, index) => {
        if (!onTodoClick) return;
        onTodoClick(todo,index)
    }
    return (
        <ul className="todo-list">
            {todoList.map((todo,index)=> (
                <li key={todo.id} 
                    className={classnames({
                        "todo-item": true,
                        completed: todo.status === "completed"
                    })}
                    onClick={()=>handleTodoClick(todo, index)}
                > 
                    { todo.title } 
                </li>
            ))}
        </ul>
    )
}

TodoList.propTypes = {
    todoList: PropTypes.array.isRequired,
    onTodoClick: PropTypes.func,
};
TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null,
};

export default TodoList
