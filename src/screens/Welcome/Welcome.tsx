import React, { useState } from 'react';
import { FullLogo, HandShake, Node, Play, Shield } from '../../icons';
import { CustomMainButton } from '../../components';
import useTelegram from '../../hooks/useTelegram';
import useApi from '../../hooks/useApi';
import useApp from '../../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';

const Instructions = () => {
    const tg = useTelegram();

    return (
        <div className="instructions">
            <p>
                Hi 👋, good one on trying to use our telegram mini app. But inorder to get started,
                you need to complete the following steps:-
            </p>

            <ul>
                <li>
                    Proceed to&nbsp;
                    <a onClick={() => tg.webApp.openLink('https://quyx.xyz')}>quyx.xyz.</a> Connect
                    to the service using your preferred TON wallet&nbsp;
                    <strong>e.g. TonKeeper</strong>
                </li>
                <li>
                    Head over to&nbsp;
                    <a onClick={() => tg.webApp.openLink('https://quyx.xyz/edit-profile')}>
                        quyx.xyz/edit-profile
                    </a>
                </li>
                <li>
                    Link this telegram account with the help of the&nbsp;
                    <strong>"Login with Telegram"</strong> button on the page
                </li>
            </ul>

            <div>
                <button onClick={() => tg.webApp.openLink('https://quyx.xyz')}>
                    Proceed to quyx.xyz
                </button>

                <a onClick={() => tg.webApp.openLink('https://quyx.xyz')}>
                    <span>Watch Explainer Video</span>
                    <Play size={18} />
                </a>
            </div>
        </div>
    );
};

const Welcome: React.FC<{}> = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const tg = useTelegram();
    const { getUser } = useApp();
    const navigate = useNavigate();
    const { openModal, setModalBody, setTitle } = useModal();

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

    async function signin() {
        if (isLoading) return;
        setIsLoading(true);

        const { auth } = await useApi();

        const response = await auth.signIn(tg.webApp.initData);
        if (response == null) {
            // no user found to have linked this tg account
            // open modal & give user a walkthrough
            setTitle('Heads up!');
            setModalBody(<Instructions />);
            openModal();

            return setIsLoading(false);
        }

        if (response) {
            // help populate the user info field
            await getUser({
                refresh_token: response.refreshToken,
                access_token: response.accessToken,
            });

            navigate('/', { replace: true });
        }

        setIsLoading(false);
    }

    return (
        <div className="welcome-screen position-relative pt-5">
            <div className="h-100 px-3">
                <FullLogo />

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

            <CustomMainButton handleClick={signin} isLoading={isLoading} type="button">
                Get Started
            </CustomMainButton>
        </div>
    );
};

export default Welcome;
