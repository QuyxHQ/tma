import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './providers/AppProvider.tsx';
import ModalProvider from './providers/ModalProvider.tsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <AppProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AppProvider>
            </ModalProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
