import React, {useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setCart } from "../../app/actions/CartActions";

const RequestCartModal = (props) => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        acceptTrade: "Pending",
        ownerId: parseInt(props.ownerId),
        ownerItemId: parseInt(props.itemId),
        requesterId: props.myAccount.id,
        requesterItemId: 0,
        transactionDate: "2021-03-10"
    })

    const handleChangeInt = (e) => {
        setForm({
            ...form,
            [e.target.id]: parseInt(e.target.value)
        })
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    };


    const handleAddToCart = async(e) => {
        console.log("ADD TO CART:");
        e.preventDefault();
        
        console.log(props.ownerId)
        console.log(props.itemId)
        window.location.href = "/cart"
        props.setShowRequestCartModal(false);
        console.log({
            ...form,
            ownerId: parseInt(props.ownerId),
            ownerItemId: parseInt(props.itemId)
        });
        dispatch(setCart({
            ...form,
            ownerId: parseInt(props.ownerId),
            ownerItemId: parseInt(props.itemId)
        }));
        
    }
    return (
        <>
            <Modal
                show={props.show}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                >
                <form onSubmit={handleAddToCart}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Request Trade
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                    <div className="row mb-2">
                                <div className="col-12">
                                    <div className="add-item-modal-image-container">
                                        <label>Item Seller</label>
                                        <div className="form-group">
                                            {
                                                props.accounts.filter(x => x.id === props.ownerId)
                                                .map((acc, index) => 
                                                <div className="add-request-image-wrapper" key={index}>
                                                    <img src={acc.profilePhoto} alt="" className="img border border-dark rounded-circle" />
                                                    <label className="mt-1 font">{acc.firstname}'s item</label>
                                                </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Details:</label><br />
                                    <label>
                                        {
                                        props.items.filter(x => x.id === props.itemId)
                                        .map((i, index) =>
                                        <label key={index}>{i.description}</label>
                                        )}
                                    </label>
                                </div>
                                <div className="col-6">
                                    <label>Price:</label><br />
                                    <label>
                                        {
                                        props.items.filter(x => x.id === props.itemId)
                                        .map((i, index) =>
                                        <label key={index}>¥{i.price}</label>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Trade Item:</label>
                                    <select className="form-control" onChange={handleChangeInt} id="requesterItemId" >
                                        <option defaultValue>Select Item</option>
                                        {
                                            props.items.filter(x => x.ownerId === props.myAccount.id && x.status === "Available")
                                            .map((i, index) =>
                                                <option key={index} value={parseInt(i.id)}>{i.description} - ¥{i.price}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label>Trade Date:</label>
                                    <input required type="date" className="form-control" placeholder="Enter publish date" id="transactionDate" onChange={handleChange}/>
                                </div>
                            </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-primary">Add To Cart</button>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
        </>
    )
}

export default RequestCartModal
