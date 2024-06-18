import React from 'react';

const HandShake: React.FC<IconProps> = ({ className, fill, handleClick, size = 24 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={size}
            height={size}
            className={className}
            onClick={handleClick}
            viewBox="0 0 24 24"
        >
            <path
                stroke={fill || 'currentColor'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M22 8h-2m0 0h-1c-2-1.998-5-4-7-2m8 2v8M12 6L9 9.002c-.08.079-.12.119-.151.154a2 2 0 000 2.691c.032.035.072.075.151.154.08.08.12.12.154.151a2 2 0 002.691 0c.035-.032.075-.072.154-.151l1-1M12 6c-2-2-5 .002-7 2H4M2 8h2m0 0v8m16 0v3h2m-2-3h-2.828M15 13l1.5 1.5c.08.08.12.12.151.155a2 2 0 010 2.69c-.032.036-.071.075-.151.155s-.12.12-.155.151a2 2 0 01-2.69 0 5.21 5.21 0 01-.155-.151L13 17c-.545.545-.818.818-1.112.964a2 2 0 01-1.776 0C9.818 17.818 9.545 17.545 9 17a1.545 1.545 0 01-2.618-.236L6 16H4m0 0v3H2"
            />
        </svg>
    );
};

export default HandShake;
