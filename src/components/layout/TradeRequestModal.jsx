import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { useDispatch } from 'react-redux';
import { updateCart } from "../../app/actions/CartActions";
import { updateItems } from "../../app/actions/ItemActions";
import { deleteCartById } from "../../app/actions/CartIdActions";

const TradeRequestModal = (props) => {

    const dispatch = useDispatch()

    const handleTransaction = (res, uCart) => {
        if(res === "ACCEPTED"){
            console.log(res);
            let reqItem = props.items.data.filter(item => item.id === uCart.requesterItemId).map(x => x);
            let ownItem = props.items.data.filter(item => item.id === uCart.ownerItemId).map(x => x);
            console.log({
                ...ownItem[0],
                status: "Sold",
                isTradeable: "false"
            })
            console.log({
                ...reqItem[0],
                status: "Sold",
                isTradeable: "false"
            });
            dispatch(updateCart({
                ...uCart,
                acceptTrade: "Accepted"
            }));
            window.location.href = "/cart"
            dispatch(updateItems(
                {
                    ...ownItem[0],
                    status: "Sold",
                    isTradeable: "false"
                }
            ));
            dispatch(updateItems(
                {
                    ...reqItem[0],
                    status: "Sold",
                    isTradeable: "false"
                }
            ));
            
        }
        else{
            console.log(res);
            window.location.href = "/cart"
            dispatch(updateCart({
                ...uCart,
                acceptTrade: "Declined"
            }))
        }
    }

    const handleRemove = (id) => {
        window.location.href = "/cart"
        console.log(id)
        dispatch(deleteCartById(id))
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
                        Trade Request List
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                            <Table striped bordered variant="light">
                                <thead>
                                    <tr>
                                        <th>Owner</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Requester</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Trade Status</th>
                                        <th>Transaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.cart.data.filter(c => c.ownerId === parseInt(window.localStorage.getItem("creds"))).map((cart, index)=>
                                            <tr key={index}>
                                                {
                                                    props.accounts.data
                                                    .filter(account => account.id === cart.ownerId)
                                                    .map((account, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={account.profilePhoto} alt=""/></td>)
                                                }
                                                {
                                                    props.items.data
                                                    .filter(item => item.id === cart.ownerItemId)
                                                    .map((item, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={item.photo} alt=""/></td>)
                                                }
                                                {
                                                    props.items.data
                                                    .filter(item => item.id === cart.ownerItemId)
                                                    .map((item, i) => 
                                                    <td key={i}>¥{item.price}</td>)
                                                }
                                                {
                                                    props.accounts.data
                                                    .filter(account => account.id === cart.requesterId)
                                                    .map((account, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={account.profilePhoto} alt=""/></td>)
                                                }
                                                {
                                                    props.items.data
                                                    .filter(item => item.id === cart.requesterItemId)
                                                    .map((item, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={item.photo} alt=""/></td>)
                                                }
                                                {
                                                    props.items.data
                                                    .filter(item => item.id === cart.requesterItemId)
                                                    .map((item, i) => 
                                                    <td key={i}>¥{item.price}</td>)
                                                }
                                                <td>{cart.acceptTrade}</td>
                                                <td>
                                                    {
                                                        cart.acceptTrade === "Pending" ?
                                                        <>
                                                            <Button variant="success" onClick={() => handleTransaction("ACCEPTED", cart)}>Accept</Button>
                                                            <Button variant="danger" className="ml-2" onClick={() => handleTransaction("DECLINED", cart)}>Decline</Button>
                                                        </>
                                                        :
                                                        <>
                                                            <Button disabled variant="success">Accept</Button>
                                                            <Button disabled variant="danger" className="ml-2">Decline</Button>
                                                        </>
                                                    }
                                                    <Button variant="secondary" className="ml-2" onClick={() => handleRemove(cart.id)}>Remove</Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default TradeRequestModal
