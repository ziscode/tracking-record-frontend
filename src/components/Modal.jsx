import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const AlertModal = ({title, message, showModal, handleClose}) => {

    const [show, setShow] = useState(false);
    console.log(showModal)
    useEffect(() => {
        if (showModal !== show) {
            console.log('A')
            setShow(showModal);
        }
    }, [showModal])
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" action="deny" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" action="confirm" onClick={handleClose}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

AlertModal.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    showModal: PropTypes.bool,
    handleClose: PropTypes.func
};

AlertModal.defaultProps = {
    title: 'Title',
    message: 'Message',
    showModal: false,
    handleClose: () => {  }
};

export default AlertModal;