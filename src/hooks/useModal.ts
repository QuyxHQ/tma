import { useContext } from 'react';
import { ModalContext } from '../providers/ModalProvider';

export default function () {
    const context = useContext(ModalContext);
    if (!context) throw new Error('useModal must be used within a ModalProvider');

    return context;
}
