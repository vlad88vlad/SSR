import { useServerFetch } from 'shared/useServerFetch/useServerFetch';
import axios from 'axios';

export const useTodoList = () => {
    const [data, loading] = useServerFetch(
        () => axios.get('https://jsonplaceholder.typicode.com/todos'),
        [],
    );

    return { data, loading };
};
