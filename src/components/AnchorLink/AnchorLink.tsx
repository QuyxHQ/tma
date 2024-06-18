import { Link } from 'react-router-dom';
import useTelegram from '../../hooks/useTelegram';

type AnchorLinkProps = {
    to: string;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    handleClick?: () => void;
    title?: string;
    target?: string;
};

const AnchorLink: React.FC<AnchorLinkProps> = (props: AnchorLinkProps) => {
    const tg = useTelegram();

    function click() {
        tg.webApp.BackButton.show();
        if (props.handleClick) props.handleClick();
    }

    return (
        <Link
            to={props.to}
            className={props.className}
            style={props.style}
            onClick={click}
            title={props.title}
            target={props.target}
        >
            {props.children}
        </Link>
    );
};

export default AnchorLink;
