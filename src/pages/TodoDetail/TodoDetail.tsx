import React from 'react';
import { useParams } from 'react-router-dom';
import Title from 'components/Title';
import { useTodoDetail } from './useTodoDetail';

const TodoDetail = () => {
    const { id } = useParams();
    const { data, loading } = useTodoDetail(id);

    if (loading) {
        return 'loading...';
    }

    return (
        <div>
            <Title>
                {data?.title}
            </Title>
        </div>
    );
};

export default TodoDetail;
