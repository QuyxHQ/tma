import React, { useState } from 'react';
import useTelegram from '../../hooks/useTelegram';
import { Badge, Power, Unlink, User, Wallet } from '../../icons';
import useApp from '../../hooks/useApp';
import { Address } from 'ton-core';
import { truncateAddress } from '../../shared/helper';
import { Loader } from '../../components';
import useApi from '../../hooks/useApi';

const Profile: React.FC<{}> = () => {
    const tg = useTelegram();
    const { user: whoami, logout } = useApp();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function signout() {
        if (isLoading) return;
        if (!confirm('Are you sure you want to signout?')) return;
        setIsLoading(true);

        const { auth } = await useApi();
        if (await auth.signOut()) await logout();

        setIsLoading(false);
    }

    async function unlinkTGAcount() {
        if (isLoading) return;
        if (!confirm('Are you sure you want to unlink this telegram account?')) return;
        setIsLoading(true);

        const { user } = await useApi();
        if (await user.unlinkTGAccount()) await logout();

        setIsLoading(false);
    }

    return (
        <div className="main-body pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="title">
                            <h1>Profile</h1>
                            <p>yippe! view your info at a glance</p>
                        </div>
                    </div>

                    <div className="col-12 mb-5">
                        <div className="profile">
                            <ul>
                                <li>
                                    <a
                                        onClick={() =>
                                            tg.webApp.openLink(
                                                `https://quyx.xyz/user/${whoami?.username}`
                                            )
                                        }
                                    >
                                        <User />
                                        <span>{whoami?.username}</span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        onClick={() =>
                                            tg.webApp.openLink(
                                                `https://tonviewer.com/${Address.parse(
                                                    whoami?.address!
                                                ).toString()}`
                                            )
                                        }
                                    >
                                        <Wallet />
                                        <span>
                                            {truncateAddress({
                                                address: Address.parse(whoami?.address!).toString(),
                                                prefixLength: 14,
                                                suffixLength: 8,
                                            })}
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a>
                                        <Badge />
                                        <span>{whoami?.did}</span>
                                    </a>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    <a onClick={unlinkTGAcount}>
                                        {isLoading ? <Loader /> : <Unlink />}
                                        <span>Unlink telegram account</span>
                                    </a>
                                </li>

                                <li>
                                    <a onClick={signout}>
                                        {isLoading ? <Loader /> : <Power />}
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
