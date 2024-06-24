import React, { useEffect } from 'react';
import useApp from '../../hooks/useApp';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnchorLink, Loader, Navbar } from '..';
import { Logo, Telegram } from '../../icons';

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
    const { isMounting, isAuthenticated, user } = useApp();

    useEffect(() => {
        (async function () {
            if (!isMounting) {
                if (!isAuthenticated && location.pathname != '/get-started') {
                    return navigate('/get-started', { replace: true });
                }

                if (user) {
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

                        <div className="main-body">
                            {!user?.tg?.id ? (
                                <div className="container mb-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="connect-tg-box">
                                                <p>
                                                    Hi, want to use our mini app better? Connect
                                                    your Telegram account to your Quyx account to
                                                    get started
                                                </p>

                                                <AnchorLink to="/profile">
                                                    <button>
                                                        <Telegram size={20} />
                                                        <span>Connect</span>
                                                    </button>
                                                </AnchorLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {children}
                        </div>
                    </div>
                </div>
            ) : !user && location.pathname !== '/get-started' ? null : (
                children
            )}
        </main>
    );
};

export default Middleware;
