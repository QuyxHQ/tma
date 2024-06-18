import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useApi from '../../hooks/useApi';
import { AnchorLink, Credential } from '../../components';
import { Box } from '../../icons';

const Dashboard: React.FC<{}> = () => {
    const page = 1;
    const limit = 20;

    const { isPending, data } = useQuery({
        queryKey: ['credentials'],
        queryFn: async function () {
            const { identity } = await useApi();
            return await identity.getCredentials(page, limit);
        },
    });

    return (
        <div className="main-body">
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-4">
                        <h1 className="mb-2">Credentials</h1>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row g-4">
                        {isPending || !data ? (
                            <div className="col-12">
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{ height: '40dvh' }}
                                >
                                    <span className="loader" />
                                </div>
                            </div>
                        ) : data.credentials.length == 0 ? (
                            <div className="col-12">
                                <div className="empty">
                                    <Box size={70} />

                                    <p>Oops! no credentials yet</p>

                                    <AnchorLink to="/create-credential">
                                        Create one &raquo;
                                    </AnchorLink>
                                </div>
                            </div>
                        ) : (
                            data.credentials.map((credential, i) =>
                                credential ? (
                                    <div className="col-12" key={`credential-${i}`}>
                                        <Credential data={credential.credential} index={i + 1} />
                                    </div>
                                ) : null
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
