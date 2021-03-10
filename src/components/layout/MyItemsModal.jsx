import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import AddItemModal from './AddItemModal'
import { useDispatch } from 'react-redux'
import { deleteItemById } from "../../app/actions/ItemById";

const MyItemsModal = (props) => {

    const dispatch = useDispatch()
    const [showAddItemModal, setShowAddItemModal] = useState(false)

    const handleAddItem = () => {
        props.setShow(false)
        setShowAddItemModal(!showAddItemModal)
    }

    const handleDeleteItem = (id) => {
        console.log(id);
        dispatch(deleteItemById(id))
        window.location.href = "/myaccount";
    }
    return (
        <>
            <Modal
                show={props.show}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.myName}'s Items
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Table striped bordered variant="light">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Specification</th>
                                    <th>Location</th>
                                    <th>Publish Date</th>
                                    <th>Configure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.data.map((item, index) => 
                                    props.myId === item.ownerId &&
                                        <tr key={index}>
                                            <td className="profilePhotoWrapper"><img className="profilePhoto" src={item.photo} alt=""/></td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>{item.category}</td>
                                            <td>{item.status}</td>
                                            <td>{item.itemSpecification}</td>
                                            <td>{item.location}</td>
                                            <td>{item.publishDate}</td>
                                            <td>
                                                <Button variant="success" className="mr-2">Edit Item</Button>
                                                <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>Delete Item</Button>
                                            </td>
                                        </tr>
                                        )
                                }
                            </tbody>
                        </Table>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAddItem}>Add Item</Button>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
                <AddItemModal show={showAddItemModal} onHide={() => setShowAddItemModal(false)}/>
        </>
    )
}

export default MyItemsModal
