import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

const TemplateModal = (props) => {
    const { show, handleClose, fee, handleEventRegistration } = props

    return (
        <>
            <Modal show={show} onHide={handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>You will be charged <b>${fee}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose()}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEventRegistration()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}



export default TemplateModal