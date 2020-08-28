import React from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import outlineArrowBackIos from '@iconify/icons-ic/outline-arrow-back-ios';



const Modal = ({ hideModal, show }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <span className="title">Change Password</span>
                <form action="">
                    <div>
                        <input className="input-pass" type="password" placeholder="Password" name="password" />
                    </div>
                    <div>
                        <input className="input-pass retype" type="password" placeholder="Re-type password" name="retype-password" />
                    </div>
                    <div className="buttons-container">
                        <button className="custom-btn btn-cancel" onClick={hideModal}><span>Cancel</span></button>
                        <input className="custom-btn btn-submit-pass" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal; 