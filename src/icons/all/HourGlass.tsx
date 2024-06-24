import React from 'react';

const HourGlass: React.FC<IconProps> = ({ className, fill, handleClick, size = 24 }) => {
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
            <path d="M6 20v-2a6 6 0 1112 0v2a1 1 0 01-1 1H7a1 1 0 01-1-1z"></path>
            <path d="M6 4v2a6 6 0 1012 0V4a1 1 0 00-1-1H7a1 1 0 00-1 1z"></path>
        </svg>
    );
};

export default HourGlass;
