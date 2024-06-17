import React from 'react';

const Shield: React.FC<IconProps> = ({ className, fill, handleClick, size = 44 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            stroke={fill || 'currentColor'}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            className={className}
            onClick={handleClick}
            viewBox="0 0 24 24"
        >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <path d="M11.46 20.846A12 12 0 013.5 6 12 12 0 0012 3a12 12 0 008.5 3 12 12 0 01-.09 7.06M15 19l2 2 4-4"></path>
        </svg>
    );
};

export default Shield;
