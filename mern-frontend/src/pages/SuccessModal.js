// src/pages/SuccessModal.js

/*
SuccessModal.js, is a React component that displays a success modal when a user successfully registers.

The SuccessModal component performs the following steps:

1. Receives two props: 'isOpen', a boolean indicating whether the modal should be open, and 'onConfirm', a function to be called when the user clicks the 'OK' button.

2. If 'isOpen' is false, it returns null, effectively rendering nothing.

3. If 'isOpen' is true, it returns a div with a fixed position in the center of the viewport, a white background, and a z-index of 100. This div contains a heading, a paragraph, and a button.

4. The heading and paragraph inform the user that registration was successful.

5. The button has an 'onClick' handler that calls the 'onConfirm' function passed in as a prop.

This component is typically used in conjunction with a form or other component that requires a success message to be displayed in a modal. It is responsible for rendering the modal and providing a way for the user to dismiss it.
*/

import React from 'react';

const SuccessModal = ({ isOpen, onConfirm }) => {
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
