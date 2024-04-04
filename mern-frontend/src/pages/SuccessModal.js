// src/pages/SuccessModal.js

import React from 'react';

const SuccessModal = ({isOpen, onConfirm}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            zIndex: 100
        }}>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully.</p>
            <button onClick={onConfirm}>OK</button>
        </div>
    );
};

export default SuccessModal;
