import {
    useContext, useState, useEffect,
} from 'react';
import { DataContext, InternalContext } from './context';

export function useServerFetch(
    effect,
    dependencies,
) {
    const internalContext = useContext(InternalContext);
    const callId = internalContext.current;

    internalContext.current += 1;
    const ctx = useContext(DataContext);
    const [data, setData] = useState(ctx[callId]?.data || {});
    const [error, setError] = useState(ctx[callId]?.error || null);
    const [loading, setLoading] = useState(false);

    if (!internalContext.resolved) {
        let cancel = Function.prototype;

        const effectPr = new Promise((resolve) => {
            cancel = () => {
                if (!ctx[callId]) {
                    ctx[callId] = {
                        error: { message: 'timeout' },
                        id: callId,
                    };
                }
                resolve(callId);
            };

            return effect()
                .then(({ data }) => {
                    ctx[callId] = { data };
                    resolve(callId);
                })
                .catch((error) => {
                    ctx[callId] = { error };
                    resolve(callId);
                });
        });

        internalContext.requests.push({
            id: callId,
            promise: effectPr,
            cancel,
        });
    }

    useEffect(() => {
        if (internalContext.resolved && !ctx[callId]) {
            setLoading(true);

            effect()
                .then(({ data }) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
        delete ctx[callId];
    }, dependencies);

    return [data, loading, error];
}
