import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TwaAnalyticsProvider } from '@tonsolutions/telemetree-react';
import AppProvider from './providers/AppProvider.tsx';
import ModalProvider from './providers/ModalProvider.tsx';
import App from './App.tsx';
import env from './shared/env.ts';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TwaAnalyticsProvider
            projectId={env.TELEMETREE_PROJECT_ID}
            apiKey={env.TELEMETREE_API_KEY}
            appName={env.TELEMETREE_APP_NAME}
        >
            <QueryClientProvider client={queryClient}>
                <TonConnectUIProvider manifestUrl="https://tma.quyx.xyz/manifest/tonconnect.json">
                    <ModalProvider>
                        <AppProvider>
                            <BrowserRouter>
                                <App />
                            </BrowserRouter>
                        </AppProvider>
                    </ModalProvider>
                </TonConnectUIProvider>
            </QueryClientProvider>
        </TwaAnalyticsProvider>
    </React.StrictMode>
);
