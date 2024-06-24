import React from 'react';
import useApi from '../../hooks/useApi';
import { AnchorLink, Credential, CredentialLoader, Loader } from '../../components';
import { Box } from '../../icons';
import { useLocation } from 'react-router-dom';
import useCustomQuery from '../../hooks/useCustomQuery';

const Dashboard: React.FC<{}> = () => {
    const { state } = useLocation();

    const should_refresh = state && state.should_refresh ? state.should_refresh : false;

    const { data, ref, isFetchingNextPage, status, isRefetching } = useCustomQuery({
        key: 'credentials',
        fn: async function ({ pageParam }) {
            const { identity } = await useApi();
            return (await identity.getCredentials(pageParam)) ?? [];
        },
    });

    const content = data?.pages.map(function (credentials) {
        return credentials.map((credential, i) => (
            <div
                ref={credentials.length == i + 1 ? ref : undefined}
                className="col-12"
                key={`credential-${i}`}
            >
                <Credential data={credential.credential} index={i + 1} />
            </div>
        ));
    });

    return (
        <div className="container mb-4">
            <div className="row">
                <div className="col-12 mb-4">
                    <div className="title">
                        <h1>Credentials</h1>
                        <p>Manage your credentials in one place</p>

                        {isRefetching && should_refresh ? (
                            <div className="pt-2">
                                <Loader />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="row g-4">
                    {status == 'pending' ? (
                        <div className="col-12">
                            <div className="credential-loader pt-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <CredentialLoader key={`credential-loader-${i}`} />
                                ))}
                            </div>
                        </div>
                    ) : !content || content[0].length == 0 ? (
                        <div className="col-12">
                            <div className="empty">
                                <Box size={60} />

                                <p>Oops! no credentials yet</p>
                                <AnchorLink to="/create-credential">Create one</AnchorLink>
                            </div>
                        </div>
                    ) : (
                        <>
                            {content}

                            {isFetchingNextPage ? (
                                <div className="col-12">
                                    <div className="d-flex align-items-center justify-content-center pt-4 pb-0">
                                        <Loader size={21} />
                                    </div>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
