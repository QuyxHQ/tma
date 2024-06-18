import React from 'react';

const Wallet: React.FC<IconProps> = ({ className, fill, handleClick, size = 24 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            stroke={fill || 'currentColor'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            className={className}
            onClick={handleClick}
            viewBox="0 0 24 24"
        >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <path d="M17 8V5a1 1 0 00-1-1H6a2 2 0 000 4h12a1 1 0 011 1v3m0 4v3a1 1 0 01-1 1H6a2 2 0 01-2-2V6"></path>
            <path d="M20 12v4h-4a2 2 0 010-4h4"></path>
        </svg>
    );
};

export default Wallet;
