import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const EditAccountModal = (props) => {
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
                        Edit Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        MY ID: {props.myId}
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success">Save</Button>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default EditAccountModal
