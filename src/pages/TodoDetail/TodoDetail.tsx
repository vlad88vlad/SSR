import React from 'react';
import { useParams } from 'react-router-dom';
import Title from 'src/components/Title';
import withHelmet from 'shared/withHelmet';
import { useTodoDetail } from './useTodoDetail';

const TodoDetail = ({ headTitle }) => {
    const { id } = useParams();
    const { data, loading } = useTodoDetail(id);

    if (loading) {
        return 'loading...';
    }

    return (
        <div>
            {headTitle(data?.title)}
            <Title>
                {data?.title}
            </Title>
        </div>
    );
};

export default withHelmet(TodoDetail, 'TodoDetail');
