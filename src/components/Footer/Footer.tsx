import React from 'react';

const Footer: React.FC<{}> = () => {
    return (
        <footer>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
            <span>Quyx - Telegram mini app</span>
        </footer>
    );
};

export default Footer;
