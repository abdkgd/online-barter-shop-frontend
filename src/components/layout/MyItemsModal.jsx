import React, {useState, useEffect} from 'react'
import { Modal, Button, Badge } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import AddItemModal from './AddItemModal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemById, getItemById } from "../../app/actions/ItemById";
import { getCart } from "../../app/actions/CartActions"
import EditItemModal from './EditItemModal'
import { Alert } from 'react-bootstrap'
import _ from "lodash";

const pageSize = 5;
const MyItemsModal = (props) => {

    const dispatch = useDispatch()
    const item = useSelector(state => state.itemid)
    const cart = useSelector(state => state.cart)
    const [showAddItemModal, setShowAddItemModal] = useState(false)
    const [showEditItemModal, setShowEditItemModal] = useState(false)
    const [paginatedMyItems, setPaginatedMyItems] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedCount, setPaginatedCount] = useState()

    useEffect(() => {
        dispatch(getCart())
        setPaginatedMyItems(_(props.data && props.data
            .filter(item => props.myId === item.ownerId)
            ).slice(0).take(pageSize).value());

        setPaginatedCount((props.data && props.data
            .filter(item => props.myId === item.ownerId)
            ));
    }, [])

    useEffect(() => {
        
    }, [cart])
    
    const handleAddItem = () => {
        props.setShow(false)
        setShowAddItemModal(!showAddItemModal)
    }

    const handleEditItem = (id) => {
            props.setShow(false)
            setShowEditItemModal(!showEditItemModal)
            console.log(id);
            const res = dispatch(getItemById(id));
            console.log(item.data)
    }

    const handleDeleteItem = (id) => {
            props.setShow(false)
            window.location.href = "/myaccount";
            console.log(id);
            dispatch(deleteItemById(id))
    }


    const pageCount = paginatedCount ? Math.ceil(paginatedCount.length / pageSize) : 0;
    const pages = _.range(1, pageCount + 1);

    const handlePagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(props.data
            .filter(item => props.myId === item.ownerId)
            ).slice(startIndex).take(pageSize).value();
        setPaginatedMyItems(paginatedPost);
        window.scrollTo(0, 0)
    }

    const handleNext = () => {
        if(pages.length !== currentPage){
            const startIndex = (currentPage) * pageSize;
            const paginatedPost = _(props.data
                .filter(item => props.myId === item.ownerId)
                ).slice(startIndex).take(pageSize).value();
            setPaginatedMyItems(paginatedPost);
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0)
        }
    }
    const handlePrevious = () => {
        if(currentPage !== 1){
            
            const startIndex = (currentPage - 2) * pageSize;
            const paginatedPost = _(props.data
                .filter(item => props.myId === item.ownerId)
                ).slice(startIndex ).take(pageSize).value();
            setPaginatedMyItems(paginatedPost);
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0)
        }
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
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {
                            props.myName
                            ?
                            props.myName + "'s Item"
                            :
                            "Seller's Item"
                        }
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
                                    {   
                                        props.isProfileItem &&
                                        <th>Configure</th>
                                    }
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    props.data && paginatedMyItems &&
                                    paginatedMyItems
                                    .map((item, index) => 
                                        <tr key={index}>
                                            <td className="profilePhotoWrapper"><img className="profilePhoto" src={item.photo} alt=""/></td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>{item.category}</td>
                                            <td>{
                                                    cart.data &&
                                                    cart.data
                                                    .filter(c => c.requesterItemId === item.id && c.acceptTrade !== "Declined")
                                                    .length > 0
                                                    ?
                                                    (item.status === "Sold" 
                                                    ?
                                                    <Badge variant="danger" className="mb-1" >{item.status}</Badge>
                                                    :
                                                    <Badge variant="warning" className="mb-1" >In Process</Badge>)
                                                    :
                                                    (item.status === "Available" 
                                                    ?
                                                    <Badge variant="success" className="mb-1" >{item.status}</Badge>
                                                    :
                                                    <Badge variant="danger" className="mb-1" >{item.status}</Badge>)
                                                }
                                                
                                            </td>
                                            <td>{item.itemSpecification}</td>
                                            <td>{item.location}</td>
                                            <td>{item.publishDate}</td>
                                            {
                                                
                                                props.isProfileItem && (cart.data &&
                                                cart.data
                                                .filter(c => (c.requesterItemId === item.id || c.ownerItemId === item.id) && c.acceptTrade !== "Declined")
                                                .length > 0
                                                ?
                                                <td>
                                                <Button variant="success" disabled className="mr-2">Edit Item</Button>
                                                <Button variant="danger" disabled>Delete Item</Button>
                                                </td>
                                                :
                                                <td>
                                                <Button variant="success" onClick={() => handleEditItem(item.id)} className="mr-2">Edit Item</Button>
                                                <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>Delete Item</Button>
                                                </td>
                                                )
                                            }
                                        </tr>
                                        )
                                }
                            </tbody>
                        </Table>
                    </div>
                            <div className="paginationWrapper mt-5 mr-5">
                                <div>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item cursor-pointer"><p className="page-link" onClick = {() => handlePrevious()}>Previous</p></li>
                                            {
                                                pages.map((page, index) => (
                                                    <li key={index} className= {page === currentPage ? "page-item active" : "page-item"}>
                                                        <p className="page-link cursor-pointer" onClick = {() => handlePagination(page)}>{page}</p>
                                                    </li>
                                                ))
                                            }
                                            <li className="page-item cursor-pointer"><p className="page-link" onClick = {() => handleNext()}>Next</p></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            props.isProfileItem &&
                            <Button variant="primary" onClick={handleAddItem}>Add Item</Button>
                        }
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
                <AddItemModal show={showAddItemModal} onHide={() => setShowAddItemModal(false)}/>
                {
                    item.data &&
                    <EditItemModal show={showEditItemModal} onHide={() => setShowEditItemModal(false)} data={item.data}/>
                }
        </>
    )
}

export default MyItemsModal
