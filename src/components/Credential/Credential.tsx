import React from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { omit } from 'lodash';
import { Check, Clock, Factory, User } from '../../icons';
import { AnchorLink, ParseJSON } from '..';

const Credential: React.FC<{ data: CredentialProps; index: number }> = ({ data, index }) => {
    return !data ? null : (
        <div className="credential">
            <AnchorLink to={`/credential/${data.proof.jwt}`}>
                <div className="top d-flex align-items-center justify-content-between">
                    <h3>#{index}</h3>

                    <div>
                        <Check size={18} />
                        <span>verified</span>
                    </div>
                </div>
            </AnchorLink>

            <div className="json">
                <ParseJSON data={omit(data.credentialSubject, ['id', 'address'])} />
            </div>

            <AnchorLink to={`/credential/${data.proof.jwt}`}>
                <div className="info">
                    <div className="d-flex align-items-center">
                        <div>
                            <Clock size={20} fill="#888" />
                        </div>
                        <p>
                            <strong>Issued:</strong>&nbsp;
                            {formatDistanceToNow(parseISO(data.issuanceDate))}
                        </p>
                    </div>

                    <div className="d-flex align-items-center">
                        <div>
                            <User size={20} fill="#888" />
                        </div>
                        <p>
                            <strong>Credential Subject:</strong> {data.issuer.id}
                        </p>
                    </div>

                    <div className="d-flex align-items-center">
                        <div>
                            <Factory size={20} fill="#888" />
                        </div>
                        <p>
                            <strong>Issued by:</strong> Quyx
                        </p>
                    </div>

                    {data.expirationDate ? (
                        <div className="d-flex align-items-center">
                            <div>
                                <Clock size={20} fill="#888" />
                            </div>
                            <p>
                                <strong>Expires:</strong>&nbsp;
                                {data.expirationDate}
                            </p>
                        </div>
                    ) : null}
                </div>
            </AnchorLink>
        </div>
    );
};

export default Credential;
