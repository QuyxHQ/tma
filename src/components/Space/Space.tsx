import React, { useState } from 'react';
import { Loader } from '..';
import { sha256 } from 'ton-crypto';
import useApi from '../../hooks/useApi';
import { isHex } from '../../shared/helper';

const Space: React.FC<{ data: Space; jwt?: string }> = ({ data, jwt }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shouldHide, setShouldHide] = useState<boolean>(false);

    async function revokeAccess() {
        if (isLoading || !jwt) return;
        if (!confirm('Are you sure you want to revoke site access to this credential?')) return;
        setIsLoading(true);

        let hash = jwt;
        if (!isHex(hash!)) hash = (await sha256(jwt)).toString('hex');

        const { identity } = await useApi();
        const resp = await identity.revokeAccess(hash, data.did);
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
                    <p>{data.did}</p>
                </div>
            </div>

            <div>
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
        </div>
    );
};

export default Space;
