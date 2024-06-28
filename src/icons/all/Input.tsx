import React from 'react';

const Input: React.FC<IconProps> = ({ className, fill, handleClick, size = 24 }) => {
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
            <path d="M12 3a3 3 0 00-3 3v12a3 3 0 003 3M6 3a3 3 0 013 3v12a3 3 0 01-3 3M13 7h7a1 1 0 011 1v8a1 1 0 01-1 1h-7M5 7H4a1 1 0 00-1 1v8a1 1 0 001 1h1M17 12h.01M13 12h.01"></path>
        </svg>
    );
};

export default Input;
