import React from 'react';
import { Link } from 'react-router-dom';

import './TodoItem.css';

const TodoItem = ({ title = '', id }) => (
    <Link to={`/todo/${id}`}>
        <div className="TodoItem">
            <div className="id">{id}</div>
            <div className="title">{title}</div>
        </div>
    </Link>
);

export default TodoItem;
