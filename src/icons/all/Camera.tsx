import React from 'react';

const Camera: React.FC<IconProps> = ({ className, fill, handleClick, size = 24 }) => {
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
            viewBox="0 0 24 24"
            className={className}
            onClick={handleClick}
        >
            <path stroke="none" d="M0 0h24v24H0z"></path>
            <path d="M15 8h.01M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6z"></path>
            <path d="M3 16l5-5c.928-.893 2.072-.893 3 0l5 5"></path>
            <path d="M14 14l1-1c.928-.893 2.072-.893 3 0l3 3"></path>
        </svg>
    );
};

export default Camera;
