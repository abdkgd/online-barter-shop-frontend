import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ProfileModal = (props) => {
    return (
        <>
            <Modal
                show={props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Account Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        {props.children}
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark">View Items</Button>
                        <Button variant="success">Send Message</Button>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default ProfileModal
