import React, { useEffect } from 'react';
import useApp from '../../hooks/useApp';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '..';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div
                style={{ height: '100%' }}
                className="d-flex align-items-center justify-content-center"
            >
                <span></span>
            </div>

            <div className="d-flex flex-column align-items-center">
                <p>Quyx.</p>
                <Loader />
            </div>
        </div>
    );
};

const Middleware: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isMounting, isAuthenticated, user } = useApp();

    useEffect(() => {
        if (!isMounting) {
            if (!isAuthenticated && location.pathname != '/get-started') {
                return navigate('/get-started');
            }

            if (user) return navigate('/');
        }
    }, [isMounting, isAuthenticated, user]);

    return <main className="app">{isMounting ? <LoadingScreen /> : children}</main>;
};

export default Middleware;
