import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function () {
    const [history, setHistory] = useState(window.history.state && window.history.state.idx > 0);
    const location = useLocation();

    useEffect(() => {
        (function () {
            setHistory(window.history.state && window.history.state.idx > 0);
        })();
    }, [location]);

    return history;
}
