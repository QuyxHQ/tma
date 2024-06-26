import React from 'react';

const Shield: React.FC<IconProps> = ({ className, fill, handleClick, size = 36 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            onClick={handleClick}
            viewBox="0 0 36 36"
        >
            <g>
                <path
                    fill={fill || 'currentColor'}
                    d="M31.25 7.4a43.79 43.79 0 01-6.62-2.35 45 45 0 01-6.08-3.21L18 1.5l-.54.35a45 45 0 01-6.08 3.21A43.79 43.79 0 014.75 7.4L4 7.59v8.34c0 13.39 13.53 18.4 13.66 18.45l.34.12.34-.12c.14 0 13.66-5.05 13.66-18.45V7.59zM30 15.93c0 11-10 15.61-12 16.43-2-.82-12-5.44-12-16.43V9.14a47.54 47.54 0 006.18-2.25 48.23 48.23 0 005.82-3 48.23 48.23 0 005.82 3A47.54 47.54 0 0030 9.14z"
                />
                <path fillOpacity="0" d="M0 0H36V36H0z"></path>
            </g>
        </svg>
    );
};

export default Shield;
