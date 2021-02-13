import { useServerFetch } from 'shared/useServerFetch/useServerFetch';
import axios from 'axios';

export const useTodoDetail = (id) => {
    const [data, loading] = useServerFetch(
        () => axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`),
        [],
    );

    return { data, loading };
};
