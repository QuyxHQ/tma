type User = {};

type TelegramUser = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
    allows_write_to_pm: boolean;
    is_premium: boolean;
};

type ModalContextProps = {
    displayModal: boolean;
    canCloseModal: boolean;
    modalBody?: React.JSX.Element;
    title?: string;
    setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
    closeModal: () => void;
    openModal: () => void;
    setModalBody: React.Dispatch<React.SetStateAction<React.JSX.Element | undefined>>;
};

type AppContextProps = {
    isMounting: boolean;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    setIsAuthenticating: React.Dispatch<React.SetStateAction<boolean>>;
    user?: User;
    login: (user: User) => void;
    logout: () => void;
    getUser(params?: { access_token: string; refresh_token: string }): Promise<void>;
};

type IconProps = {
    size?: number;
    className?: string;
    handleClick?: () => void;
    fill?: string;
};
