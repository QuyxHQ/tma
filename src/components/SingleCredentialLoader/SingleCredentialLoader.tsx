import React from 'react';

const SingleCredentialLoader: React.FC<{}> = () => {
    return (
        <div className="single-credential-loader">
            <div className="image skeleton" />
            <p className="skeleton" />

            <div>
                <p className="skeleton" />
                <p className="skeleton" />
                <p className="skeleton" />
            </div>
        </div>
    );
};

export default SingleCredentialLoader;
