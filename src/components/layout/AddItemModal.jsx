import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import blank from '../../assets/images/cart-1.svg'
import { useDispatch } from "react-redux";
import { setItems } from "../../app/actions/ItemActions";

const AddItemModal = (props) => {

    const dispatch = useDispatch();
    const [itemImg, setitemImg] = useState(blank)
    const [form, setForm] = useState({
        description : '',
        photo: '',
        price: 0,
        category: '',
        publishDate: '',
        status: '',
        isTradeable: '',
        location: '',
        itemSpecification: '',
        ownerId : parseInt(window.localStorage.getItem("creds")
        ?
        window.localStorage.getItem("creds")
        :
        window.sessionStorage.getItem("creds")),
    })

    const imageHandler = (e) => {
        
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setitemImg(reader.result)
                setForm({
                    ...form,
                    [e.target.id]: reader.result
                })
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch (error) {
            setitemImg(blank);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(form)
        const res = await dispatch(setItems(form));
        window.location.href = "/myaccount";
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
                <form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Items
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                            <div className="row mb-2">
                                <div className="col-12">
                                    <div className="add-item-modal-image-container">
                                        <label>Add Profile Image</label>
                                        <div className="form-group">
                                            <div className="add-item-image-wrapper">
                                                <img src={itemImg} alt="" className="img border border-dark rounded-circle" />
                                            </div>
                                            <div className="add-item-input-wrapper">
                                                <input required type="file" accept="image/*" name="image-upload" className="imgInput" onChange={imageHandler} id="photo"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Item:</label>
                                    <input required type="text" className="form-control" placeholder="Enter item" id="description" onChange={handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Price:</label>
                                    <input required type="number" className="form-control" placeholder="Enter price" id="price" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Category:</label>
                                    {/* <input required type="text" className="form-control" placeholder="Enter category" id="category" onChange={handleChange}/> */}
                                    <select className="form-control" onChange={handleChange} id="category">
                                        <option defaultValue>Select Category</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Music">Music</option>
                                        <option value="Games">Games</option>
                                        <option value="Appliances">Appliances</option>
                                        <option value="Cars">Cars</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label>Publish Date:</label>
                                    <input required type="date" className="form-control" placeholder="Enter publish date" id="publishDate" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Status:</label>
                                    <select className="form-control" onChange={handleChange} id="status">
                                        <option defaultValue>Select Status</option>
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label>Tradeable:</label>
                                    <select className="form-control" onChange={handleChange} id="isTradeable">
                                        <option defaultValue>Select Tradeable</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Location:</label>
                                    <input required type="text" className="form-control" placeholder="Enter location" id="location" onChange={handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Specification:</label>
                                    <input required type="text" className="form-control" placeholder="Enter specification" id="itemSpecification" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" className="btn btn-primary">Save Item</button>
                            <Button onClick={props.onHide} variant="danger">Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
        </>
    )
}

export default AddItemModal
