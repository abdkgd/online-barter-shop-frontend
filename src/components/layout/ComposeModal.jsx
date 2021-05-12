import React from 'react'
import { Modal, Button, Badge } from 'react-bootstrap'

const ComposeModal = (props) => {
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
                        Compose Message
                    </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default ComposeModal
