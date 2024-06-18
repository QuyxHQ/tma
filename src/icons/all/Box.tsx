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
            <path d="M19.953 8.017L21 15v2a3 3 0 01-3 3H6a3 3 0 01-3-3v-2l1.245-8.297A2 2 0 016.222 5H10M3 15h18M13 3l5.5 1.5M15.75 3.75l-2 7"></path>
            <path d="M7 10.5c1.667-.667 3.333-.667 5 0 1.667.667 3.333.667 5 0"></path>
        </svg>
    );
};

export default Box;
