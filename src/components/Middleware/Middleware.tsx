import React, { useEffect } from 'react';
import useApp from '../../hooks/useApp';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader, Navbar } from '..';
import { Logo } from '../../icons';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="d-flex align-items-center justify-content-center h-100 w-100">
                <Logo size={70} />
            </div>

            <div className="d-flex flex-column align-items-center">
                <p>Quyx mini app.</p>
                <Loader />
            </div>
        </div>
    );
};

const Middleware: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isMounting, isAuthenticated, user, logout } = useApp();

    useEffect(() => {
        (async function () {
            if (!isMounting) {
                if (!isAuthenticated && location.pathname != '/get-started') {
                    return navigate('/get-started', { replace: true });
                }

                if (user) {
                    if (!user.tg || user.tg.id == null) return await logout();
                    if (location.pathname == '/get-started') {
                        return navigate('/', { replace: true });
                    }
                }
            }

            return;
        })();
    }, [isMounting, isAuthenticated, user]);

    return (
        <main className="app">
            {isMounting ? (
                <LoadingScreen />
            ) : isAuthenticated ? (
                <div className="main-screen">
                    <div>
                        <Navbar />
                        {children}
                    </div>
                </div>
            ) : !user && location.pathname !== '/get-started' ? null : (
                children
            )}
        </main>
    );
};

export default Middleware;
