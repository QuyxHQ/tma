import React, { createContext, useState } from 'react';

type ModalProviderProps = {
    children: React.ReactNode;
};

export const ModalContext = createContext<ModalContextProps>({
    displayModal: false,
    canCloseModal: true,
    closeModal() {},
    openModal() {},
    setModalBody: () => {},
    setTitle: () => {},
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [canCloseModal, setCanCloseModal] = useState<boolean>(true);
    const [displayModal, setDisplayModal] = useState<boolean>(false);
    const [modalBody, setModalBody] = useState<React.JSX.Element>();
    const [title, setTitle] = useState<string>();

    const openModal = (canClose = true) => {
        setCanCloseModal(canClose);
        setDisplayModal(true);
    };

    const closeModal = () => setDisplayModal(false);

    return (
        <ModalContext.Provider
            value={{
                displayModal,
                canCloseModal,
                modalBody,
                title,
                setModalBody,
                openModal,
                closeModal,
                setTitle,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
