import React, { useEffect, useState } from 'react';
import { THEME, useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react';
import { FullLogo, HandShake, Node, Shield, TON } from '../../icons';
import { CustomMainButton } from '../../components';
import useApi from '../../hooks/useApi';
import useApp from '../../hooks/useApp';
import useTonConnect from '../../hooks/useTonConnect';
import env from '../../shared/env';

const Welcome: React.FC<{}> = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { getUser } = useApp();
    const { open } = useTonConnectModal();
    const { connected } = useTonConnect();
    const [tonConnectUI] = useTonConnectUI();

    async function connect() {
        if (connected) {
            await Promise.all([
                tonConnectUI.disconnect(),
                env.storage.removeItem('access_token'),
                env.storage.removeItem('refresh_token'),
            ]);
        }

        open();
    }

    const slider = [
        {
            icon: <Node size={100} />,
            title: 'Decentralization',
            description: `Embrace the future of digital identities with our decentralized solution. Secure, self-sovereign, and privacy-focused.`,
        },
        {
            icon: <Shield size={90} />,
            title: 'Verifiable Credentials',
            description: `Empower your digital credentials with verifiable, tamper-proof, and decentralized verification mechanisms.`,
        },
        {
            icon: <HandShake size={120} />,
            title: 'Trusted Interactions',
            description: `Foster trust in your online interactions with decentralized identities and verifiable credentials.`,
        },
    ];

    useEffect(() => {
        tonConnectUI.uiOptions = {
            uiPreferences: {
                theme: THEME.LIGHT,
            },
        };

        tonConnectUI.setConnectRequestParameters({
            state: 'loading',
        });

        (async function () {
            const { auth } = await useApi();

            const token = await auth.getProofPayload();
            if (!token) {
                tonConnectUI.setConnectRequestParameters(null);
            } else {
                tonConnectUI.setConnectRequestParameters({
                    state: 'ready',
                    value: {
                        tonProof: token,
                    },
                });
            }
        })();

        tonConnectUI.onStatusChange(async (wallet) => {
            const { auth } = await useApi();

            if (
                wallet &&
                wallet.connectItems?.tonProof &&
                'proof' in wallet.connectItems.tonProof
            ) {
                setIsLoading(true);

                const authTokens = await auth.authenticateWallet(wallet);
                if (!authTokens) {
                    await tonConnectUI.disconnect();
                    return setIsLoading(false);
                }

                const { accessToken, refreshToken } = authTokens;

                await getUser({ access_token: accessToken, refresh_token: refreshToken });
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <div className="welcome-screen position-relative pt-5">
            <div className="h-100 px-3">
                <FullLogo className="mb-3" size={40} />

                <div>
                    <div className="content">
                        <div className="py-2">{slider[currentIndex].icon}</div>

                        <h2>{slider[currentIndex].title}</h2>
                        <p>{slider[currentIndex].description}</p>
                    </div>

                    <div className="dots">
                        {Array.from({ length: slider.length }).map((_, i) => (
                            <span
                                key={`pointer-${i}`}
                                onClick={() => setCurrentIndex(i)}
                                className={i == currentIndex ? 'active' : ''}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <CustomMainButton handleClick={connect} isLoading={isLoading} type="button">
                <TON size={20} />
                Connect wallet
            </CustomMainButton>
        </div>
    );
};

export default Welcome;
