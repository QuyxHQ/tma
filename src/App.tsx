import React, { useCallback, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import useTelegram from './hooks/useTelegram';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { Middleware, Modal } from './components';
import {
    CreateCredential,
    Dashboard,
    NotFound,
    Profile,
    SingleCredential,
    Welcome,
} from './screens';

const App: React.FC<{}> = () => {
    const tg = useTelegram();
    const navigate = useNavigate();

    const onBackClick = useCallback(() => navigate(-1), [navigate]);

    useEffect(() => {
        const handleHistoryChange = () => {
            if (window.history.length === 1) tg.webApp.BackButton.hide();
            else tg.webApp.BackButton.show();
        };

        window.addEventListener('popstate', handleHistoryChange);
        return () => window.removeEventListener('popstate', handleHistoryChange);
    }, []);

    useEffect(() => {
        (async function () {
            if (!tg) return;

            tg.webApp.ready();
            tg.webApp.BackButton.onClick(onBackClick);

            if (!tg.webApp.isExpanded) tg.webApp.expand();
            if (!tg.webApp.isClosingConfirmationEnabled) tg.webApp.enableClosingConfirmation();

            return () => tg.webApp.BackButton.offClick(onBackClick);
        })();
    }, [tg]);

    return (
        <main>
            <Modal />
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route index element={<Middleware children={<Dashboard />} />} />
                <Route path="/get-started" element={<Middleware children={<Welcome />} />} />
                <Route path="/profile" element={<Middleware children={<Profile />} />} />
                <Route
                    path="/create-credential"
                    element={<Middleware children={<CreateCredential />} />}
                />
                <Route
                    path="/credential/:jwt"
                    element={<Middleware children={<SingleCredential />} />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
};

export default App;
