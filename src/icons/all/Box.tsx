import React from 'react';

const Box: React.FC<IconProps> = ({ className, fill, handleClick, size = 24 }) => {
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
            <path d="M13 20l7-7M13 20v-6a1 1 0 011-1h6V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h7"></path>
        </svg>
    );
};

export default Box;
