export default function () {
    const webApp = (window as any)?.Telegram.WebApp;

    const response = {
        webApp,
        theme: webApp.colorScheme as 'light' | 'dark',
        initDataUnsafe: webApp.initDataUnsafe,
        user: webApp.initDataUnsafe?.user as TelegramUser | undefined,
    };

    return response;
}
