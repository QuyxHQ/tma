type User = Base & {
    username: string;
    hasBlueTick: boolean;
    address: string;
    did: string;
    pfp?: string | null;
    bio?: string | null;
    tg?: {
        id: number;
        firstName: string;
        lastName?: string | null;
        username?: string | null;
        languageCode?: string | null;
        photoUrl?: string | null;
    };
    socials?: {
        x?: string | null;
        yt?: string | null;
        tg?: string | null;
        other?: string | null;
    };
    pending_usernames: {
        username: string;
        address: string;
    }[];
};

type Base = {
    readonly _id: string;
    createdAt: string;
    updatedAt: string;
    _v: number;
};

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
    logout: () => Promise<void>;
    getUser(params?: { access_token: string; refresh_token: string }): Promise<void>;
};

type IconProps = {
    size?: number;
    className?: string;
    handleClick?: () => void;
    fill?: string;
};

type AccountAddress = {
    address: string;
    name?: string;
    is_scam: boolean;
    icon?: string;
    is_wallet: boolean;
};

type NftItemPrice = {
    value: string;
    token_name: string;
};

type NftItemSale = {
    address: string;
    market: AccountAddress;
    owner?: AccountAddress;
    price: NftItemPrice;
};

type NftItem = {
    address: string;
    index: number;
    owner?: AccountAddress;
    collection?: {
        address: string;
        name: string;
        description: string;
    };
    verified: boolean;
    metadata: Record<string, any>;
    sale?: NftItemSale;
    previews?: [{ resolution: string; url: string }];
    dns?: string;
    approved_by: 'getgems' | 'tonkeeper' | 'ton.diamonds';
    include_cnft?: boolean;
    trust: 'whitelist' | 'graylist' | 'blacklist' | 'none';
};

type DID = `did:key:${string}`;

type CredentialProps = {
    credentialSubject: { id: DID; address: string; [key: string]: string };
    issuer: { id: DID };
    type: string[];
    '@context': ['https://www.w3.org/2018/credentials/v1'];
    issuanceDate: string;
    expirationDate?: string;
    proof: { type: 'JwtProof2020'; jwt: string };
};
