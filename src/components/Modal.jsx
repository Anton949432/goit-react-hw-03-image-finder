import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ onCloseModal, largeImageURL, webformatURL }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                onCloseModal();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCloseModal]);

    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            onCloseModal();
        }
    };

    return (
        <div className="overlay" onClick={handleBackdropClick}>
            <div className="modal">
                {webformatURL && largeImageURL && <img src={webformatURL} alt="Full size" />}
            </div>
        </div>
    );
};

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
};

export default Modal;



