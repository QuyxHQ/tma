import React from 'react';

const Badge: React.FC<IconProps> = ({ className, fill, handleClick, size = 24 }) => {
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
            <path d="M7 12h3v4H7z"></path>
            <path d="M10 6H4a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1h-6"></path>
            <path d="M10 4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1h-2a1 1 0 01-1-1zM14 16h2M14 12h4"></path>
        </svg>
    );
};

export default Badge;
