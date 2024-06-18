import React, { useState } from 'react';
import { Loader } from '..';
import { sha256 } from 'ton-crypto';
import useApi from '../../hooks/useApi';

const Space: React.FC<{ data: Space; jwt?: string }> = ({ data, jwt }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shouldHide, setShouldHide] = useState<boolean>(false);

    async function revokeAccess() {
        if (isLoading || !jwt) return;
        if (!confirm('Are you sure you want to revoke site access to this credential?')) return;
        setIsLoading(true);

        const [{ identity }, hash] = await Promise.all([useApi(), sha256(jwt)]);
        const resp = await identity.revokeAccess(hash.toString('hex'), data.did);
        if (resp) setShouldHide(true);

        setIsLoading(false);
    }

    return shouldHide ? null : (
        <div className="space d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-start">
                <div>
                    <div className="avatar">{data.name.charAt(0)}</div>
                </div>

                <div className="info">
                    <h4>{data.name}</h4>
                    <p>{data.url}</p>
                </div>
            </div>

            <button onClick={revokeAccess} disabled={isLoading}>
                {isLoading ? (
                    <div className="px-2">
                        <Loader size={15} />
                    </div>
                ) : (
                    <span>Revoke</span>
                )}
            </button>
        </div>
    );
};

export default Space;
