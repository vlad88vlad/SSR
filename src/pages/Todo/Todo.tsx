import React from 'react';
import withHelmet from 'shared/withHelmet';
import { useTodoList } from './useTodoList';
import TodoItem from './components/TodoItem';

const Todo = () => {
    const { data = [], loading } = useTodoList();

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

export default withHelmet(Todo, 'Todo');
