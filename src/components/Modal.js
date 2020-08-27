import React from 'react';

const Modal = ({ hideModal, show }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <div>
                    form and inputs
                </div>
                <button className="modal-back-link" onClick={hideModal}>back to products</button>
            </div>
        </div>
    );
};

export default Modal; 