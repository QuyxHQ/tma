import React from 'react';

const HandShake: React.FC<IconProps> = ({ className, fill, handleClick, size = 200 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            fill={fill || 'currentColor'}
            onClick={handleClick}
            version="1.1"
            viewBox="0 0 477.548 477.548"
            xmlSpace="preserve"
        >
            <g>
                <path d="M141.585 180.721l27.183-.043a23.02 23.02 0 0016.372-6.812 23.016 23.016 0 006.759-16.393c-.021-12.76-10.41-23.131-23.167-23.131h-.022l-102.275.096a6.5 6.5 0 00.006 13h.006l102.275-.096h.01c5.598 0 10.158 4.552 10.167 10.151a10.102 10.102 0 01-2.966 7.194 10.1 10.1 0 01-7.185 2.989l-42.84.068a6.5 6.5 0 00-4.586 11.096l95.641 95.641a8.897 8.897 0 012.623 6.332c0 2.392-.932 4.641-2.623 6.333s-3.94 2.623-6.333 2.623a8.897 8.897 0 01-6.332-2.623l-72.225-72.225a6.5 6.5 0 00-9.192 9.192l85.988 85.988c3.491 3.492 3.491 9.173 0 12.665a8.897 8.897 0 01-6.332 2.623 8.897 8.897 0 01-6.332-2.623l-82.43-82.43a6.5 6.5 0 00-9.192 9.192l65.388 65.388a8.897 8.897 0 012.623 6.332 8.901 8.901 0 01-2.623 6.333c-3.492 3.492-9.174 3.491-12.665 0L87.342 257.62a6.5 6.5 0 00-9.192 9.192l47.831 47.831c3.492 3.492 3.492 9.173 0 12.665-3.491 3.491-9.173 3.492-12.665 0l-74.449-74.449c-14.563-14.563-23.762-33.864-25.902-54.348a6.5 6.5 0 00-12.93 1.35C2.484 223.3 13.01 245.386 29.674 262.05l74.449 74.449c4.28 4.28 9.902 6.42 15.525 6.42 5.622 0 11.244-2.14 15.524-6.42a21.803 21.803 0 004.968-7.697l7.971 7.971a21.81 21.81 0 0015.524 6.431 21.811 21.811 0 0015.525-6.431 21.877 21.877 0 004.975-7.69l2.874 2.874a21.81 21.81 0 0015.524 6.431 21.811 21.811 0 0015.525-6.431c8.426-8.427 8.539-22.045.375-30.634a21.87 21.87 0 007.719-4.985 21.811 21.811 0 006.431-15.525 21.81 21.81 0 00-6.431-15.524l-84.567-84.568zM471.723 192.722a6.502 6.502 0 00-7.14 5.79c-2.14 20.483-11.339 39.785-25.902 54.348l-74.449 74.449c-3.491 3.491-9.173 3.492-12.665 0-3.492-3.492-3.492-9.173 0-12.665l47.831-47.831a6.5 6.5 0 00-9.192-9.192l-69.963 69.963c-3.491 3.491-9.173 3.492-12.665 0a8.898 8.898 0 01-2.623-6.333c0-2.392.932-4.641 2.623-6.332l65.388-65.388a6.5 6.5 0 00-9.192-9.192l-82.43 82.43a8.898 8.898 0 01-6.333 2.623 8.897 8.897 0 01-6.332-2.623c-3.491-3.492-3.491-9.173 0-12.665l85.988-85.988a6.5 6.5 0 00-9.192-9.192l-72.225 72.225c-3.492 3.492-9.174 3.491-12.665 0a8.898 8.898 0 01-2.623-6.333c0-2.392.932-4.641 2.623-6.332l89.523-89.523c6.598 12.357 17.041 22.115 30.052 27.878 8.184 3.625 16.854 5.443 25.544 5.443 7.681 0 15.376-1.421 22.756-4.27a6.5 6.5 0 00-4.682-12.128c-12.49 4.822-26.11 4.493-38.354-.931-12.242-5.422-21.639-15.288-26.461-27.778a8.326 8.326 0 00-3.18-3.911 6.48 6.48 0 00-4.143-1.518l-42.84-.068a10.1 10.1 0 01-7.185-2.989 10.1 10.1 0 01-2.966-7.194c.009-5.6 4.568-10.151 10.167-10.151h.01l102.274.096h.006a6.5 6.5 0 00.006-13l-102.274-.096h-.022c-12.756 0-23.146 10.372-23.167 23.131a23.02 23.02 0 006.759 16.393 23.017 23.017 0 0016.372 6.812l27.183.043-84.57 84.57a21.81 21.81 0 00-6.431 15.524 21.811 21.811 0 006.431 15.525 21.856 21.856 0 007.719 4.985c-8.164 8.589-8.051 22.207.375 30.634a21.81 21.81 0 0015.524 6.431 21.811 21.811 0 0015.525-6.431l2.874-2.874a21.877 21.877 0 004.975 7.69 21.811 21.811 0 0015.525 6.431 21.81 21.81 0 0015.524-6.431l7.971-7.971a21.812 21.812 0 004.968 7.697c4.28 4.28 9.902 6.42 15.525 6.42 5.622 0 11.244-2.14 15.524-6.42l74.449-74.449c16.665-16.665 27.19-38.75 29.639-62.189a6.497 6.497 0 00-5.787-7.143z"></path>
            </g>
        </svg>
    );
};

export default HandShake;
