import React, { useEffect } from 'react';
import useModal from '../../hooks/useModal';
import { Cancel } from '../../icons';

const Modal: React.FC<{}> = () => {
    const { displayModal, modalBody, closeModal, canCloseModal, title } = useModal();

    useEffect(() => {
        if (displayModal) document.body.classList.add('no-scroll');
        else document.body.classList.remove('no-scroll');
    }, [displayModal]);

    function handleOverlayClick(e: any) {
        if (e.target.classList.contains('modal') && canCloseModal) closeModal();
        return;
    }

    useEffect(() => {
        const handleEsc = (e: any) => {
            if (e.keyCode === 27 && displayModal && canCloseModal) closeModal();
        };

        if (displayModal) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [displayModal]);

    return (
        <div className={`modal ${displayModal ? 'd-flex' : 'd-none'}`} onClick={handleOverlayClick}>
            <div className="modal-box">
                <div className="modal-title position-relative">
                    <h4>{title ?? 'Dialog'}</h4>

                    {canCloseModal ? (
                        <Cancel
                            className="close position-absolute"
                            handleClick={closeModal}
                            size={19}
                        />
                    ) : null}
                </div>

                <div className="body">{modalBody ?? 'Empty Modal'}</div>
            </div>
        </div>
    );
};

export default Modal;
