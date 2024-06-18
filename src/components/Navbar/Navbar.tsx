import React from 'react';
import { AnchorLink } from '..';
import { FullLogo, Plus } from '../../icons';
import useApp from '../../hooks/useApp';
import { getAvatar } from '../../shared/helper';

const Navbar: React.FC<{}> = () => {
    const { user } = useApp();

    return (
        <nav className="navbar d-flex align-items-center justify-content-between">
            <AnchorLink to="/">
                <FullLogo size={33} />
            </AnchorLink>

            <div className="d-flex align-items-center" style={{ gap: '0.8rem' }}>
                <AnchorLink to="/create-credential">
                    <button>
                        <Plus />
                    </button>
                </AnchorLink>

                <AnchorLink to="/profile">
                    <img src={getAvatar(user?.pfp || null, user?.username!)} alt={user?.username} />
                </AnchorLink>
            </div>
        </nav>
    );
};

export default Navbar;
