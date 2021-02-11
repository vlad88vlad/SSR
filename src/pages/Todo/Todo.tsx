import React from 'react';
import { useTodoList } from './useTodoList';
import TodoItem from './components/TodoItem';

const Todo = () => {
    const { data = [], loading } = useTodoList();

    console.log(data);
    console.log(data?.length);
    if (loading) {
        return 'loading...';
    }

    return (
        <div>
            {data?.length && data?.map(({ id, title }) => (
                // @ts-ignore
                <TodoItem title={title} id={id} key={id} />
            ))}

        </div>
    );
};

export default Todo;
