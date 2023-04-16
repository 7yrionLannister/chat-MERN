import { useEffect, useState } from 'react';
import constants from '../data/constants.json';

export function useFetch({
    url = constants.path,
    method = 'GET',
    body = undefined
}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        fetch(
            { method, url, body: JSON.stringify(body) },
            { signal: abortController.signal }
        )
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((err) => {
                if (err.name === 'AbortError') console.log('Request cancelled');
                else setError(err);
            })
            .finally(() => setLoading(false));
        return () => abortController.abort(); // abort the request if the component using the hook is no longer rendered
    }, [retry]);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError('Request cancelled');
        }
    };

    const handleRetryRequest = () => {
        if (error) {
            setError(null);
            setRetry((r) => r + 1);
        }
    };

    return { data, loading, error, handleCancelRequest, handleRetryRequest };
}
