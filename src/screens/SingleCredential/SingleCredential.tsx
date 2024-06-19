import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sha256 } from 'ton-crypto';
import useApi from '../../hooks/useApi';
import { Box, Trash } from '../../icons';
import {
    CustomMainButton,
    Loader,
    ParseJSON,
    SingleCredentialLoader,
    Space,
} from '../../components';
import { getHumanReadableDateTIme, isHex } from '../../shared/helper';
import useTelegram from '../../hooks/useTelegram';

const SingleCredential: React.FC<{}> = () => {
    const [selectedIndex, setSelectedIndex] = useState<0 | 1>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { jwt } = useParams();
    const navigate = useNavigate();
    const tg = useTelegram();

    const { isPending, data } = useQuery({
        queryKey: [jwt],
        queryFn: async function () {
            const { misc, identity } = await useApi();

            let hash = jwt;
            if (!isHex(hash!)) hash = (await sha256(jwt)).toString('hex');

            const data = await identity.getCredentialFromHash(hash!);
            if (data && data.spaces.length > 0 && typeof data.spaces[0] == 'string') {
                const spaces = await misc.getSpaceFromDIDs(data.spaces as any);
                data.spaces = spaces;
            }

            if (!data) navigate('/', { replace: true });
            return data || null;
        },
    });

    async function revoke() {
        if (isLoading) return;
        if (!confirm('Are you sure you want to revoke this credential?')) return;
        setIsLoading(true);

        const [{ identity }, hash] = await Promise.all([useApi(), sha256(jwt)]);
        const resp = await identity.revoke(hash.toString('hex'));
        if (resp) {
            navigate('/', {
                state: {
                    should_refresh: true,
                },
            });
        }

        setIsLoading(false);
    }

    return (
        <div className="main-body pb-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-3">
                        {isPending || !data ? (
                            <SingleCredentialLoader />
                        ) : (
                            <div className="single-credential">
                                <div className="top">
                                    <img
                                        src={data.credential.credentialSubject.url}
                                        alt={data.credential.credentialSubject.username}
                                    />

                                    <h1>{data.credential.credentialSubject.username}</h1>
                                    <p className="mb-3">{data.credential.credentialSubject.bio}</p>

                                    <button onClick={revoke} disabled={isLoading}>
                                        {isLoading ? (
                                            <Loader />
                                        ) : (
                                            <>
                                                <Trash size={19} />
                                                <span>Revoke credential</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="tab">
                                    <p
                                        className={selectedIndex == 0 ? 'active' : ''}
                                        onClick={() => setSelectedIndex(0)}
                                    >
                                        Metadata
                                    </p>

                                    <p
                                        className={selectedIndex == 1 ? 'active' : ''}
                                        onClick={() => setSelectedIndex(1)}
                                    >
                                        Spaces
                                    </p>
                                </div>

                                <div
                                    className={`metadata ${
                                        selectedIndex == 0 ? 'd-blok' : 'd-none'
                                    }`}
                                >
                                    <div className="json">
                                        <ParseJSON data={data.credential} />
                                    </div>

                                    <p>
                                        This credential has been verified to be issued by&nbsp;
                                        <strong>Quyx</strong> on&nbsp;
                                        <strong>
                                            {getHumanReadableDateTIme(data.credential.issuanceDate)}
                                        </strong>
                                        {data.credential.expirationDate
                                            ? ` and is set to expire on ${getHumanReadableDateTIme(
                                                  data.credential.expirationDate
                                              )}`
                                            : null}
                                    </p>

                                    <div style={{ margin: '-1rem' }}>
                                        <CustomMainButton
                                            handleClick={() =>
                                                tg.webApp.openLink(
                                                    `https://jwt.io/#debugger-io?token=${jwt}`
                                                )
                                            }
                                        >
                                            View more info
                                        </CustomMainButton>
                                    </div>
                                </div>

                                <div
                                    className={`spaces ${selectedIndex == 1 ? 'd-flex' : 'd-none'}`}
                                >
                                    {data.spaces.length == 0 ? (
                                        <div className="no-data mb-3">
                                            <Box size={50} />
                                            <p>no site has access to this credential</p>
                                        </div>
                                    ) : (
                                        data.spaces.map((space) => (
                                            <Space data={space} key={space.did} jwt={jwt} />
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCredential;
