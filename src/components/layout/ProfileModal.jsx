import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const ProfileModal = (props) => {

    const handleViewItems = () => {
        props.setShowModal(false)
        props.setShowModalMyItems(true)
    }
    return (
        <>
            <Modal
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                >
                <Modal.Header>
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
                        <Button onClick={() => handleViewItems()} variant="success">View Items</Button>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default ProfileModal
