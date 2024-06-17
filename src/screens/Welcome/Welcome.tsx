import React, { useState } from 'react';
import { FullLogo, HandShake, Node, Shield } from '../../icons';
import { CustomMainButton, GradientGlow } from '../../components';
import useTelegram from '../../hooks/useTelegram';
import useApi from '../../hooks/useApi';
import useApp from '../../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';

const Welcome: React.FC<{}> = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const tg = useTelegram();
    const { getUser } = useApp();
    const navigate = useNavigate();
    const { openModal, setModalBody } = useModal();

    const slider = [
        {
            icon: <Node size={140} />,
            title: 'Decentralized Identities',
            description: `Embrace the future of digital identities with our decentralized solution. Secure, self-sovereign, and privacy-focused.`,
        },
        {
            icon: <Shield size={90} />,
            title: 'Verifiable Credentials',
            description: `Empower your digital credentials with verifiable, tamper-proof, and decentralized verification mechanisms.`,
        },
        {
            icon: <HandShake size={150} />,
            title: 'Trusted Interactions',
            description: `Foster trust in your online interactions with decentralized identities and verifiable credentials.`,
        },
    ];

    async function signin() {
        if (isLoading) return;
        setIsLoading(true);

        const { auth } = await useApi();

        const response = await auth.signIn(tg.webApp.initData);
        if (response == undefined) {
            // no user found to have linked this tg account
            // open modal & give user a walkthrough
            setModalBody(<>Link this TG account to your Quyx account first</>);
            openModal();

            return setIsLoading(false);
        }

        if (response) {
            // help populate the user info field
            await getUser({
                refresh_token: response.refreshToken,
                access_token: response.accessToken,
            });

            navigate('/');
        }

        setIsLoading(false);
    }

    return (
        <div className="welcome-screen position-relative">
            <GradientGlow />

            <div className="h-100 px-3">
                <FullLogo />

                <div>
                    <div className="content">
                        {slider[currentIndex].icon}

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
