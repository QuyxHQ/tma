import React from 'react';
import { Loader } from '..';

type Props = {
    children: React.ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
    className?: string;
    type?: 'button' | 'submit';
    isLoading?: boolean;
};

const CustomMainButton: React.FC<Props> = (props) => {
    return (
        <div className="w-100" style={{ padding: '1rem' }}>
            <button
                onClick={props.handleClick}
                className={`main-btn d-flex align-items-center justify-content-center ${props.className}`}
                disabled={props.disabled || props.isLoading}
                type={props.type}
            >
                {props.isLoading ? <Loader size={21} /> : props.children}
            </button>
        </div>
    );
};

export default CustomMainButton;
