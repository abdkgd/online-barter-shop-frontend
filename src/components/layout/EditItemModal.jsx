import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { updateItems } from "../../app/actions/ItemActions";

const EditItemModal = (props) => {

    const dispatch = useDispatch();
    const [itemImg, setitemImg] = useState(props.data.photo)

    const [form, setForm] = useState({
        id: props.data.id,
        description : props.data.description,
        photo: props.data.photo,
        price: props.data.price,
        category: props.data.category,
        publishDate: props.data.publishDate,
        status: props.data.status,
        isTradeable: props.data.isTradeable,
        location: props.data.location,
        itemSpecification: props.data.itemSpecification,
        ownerId : props.data.ownerId,
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
            setitemImg(props.data.photo);
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
        const res = await dispatch(updateItems(form));
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
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                    <div className="row mb-2">
                                <div className="col-12">
                                    <div className="add-item-modal-image-container">
                                        <label>Update Item Image</label>
                                        <div className="form-group">
                                            <div className="add-item-image-wrapper">
                                                <img src={itemImg} alt="" className="img border border-dark rounded-circle" />
                                            </div>
                                            <div className="add-item-input-wrapper">
                                                <input type="file" accept="image/*" name="image-upload" className="imgInput" onChange={imageHandler} id="photo"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Item:</label>
                                    <input required defaultValue={props.data.description} type="text" className="form-control" placeholder="Enter item" id="description" onChange={handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Price:</label>
                                    <input required defaultValue={props.data.price} type="number" className="form-control" placeholder="Enter price" id="price" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Category:</label>
                                    {/* <input required type="text" className="form-control" placeholder="Enter category" id="category" onChange={handleChange}/> */}
                                    <select className="form-control" defaultValue={props.data.category} onChange={handleChange} id="category">
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
                                    <input required defaultValue={props.data.publishDate} type="date" className="form-control" placeholder="Enter publish date" id="publishDate" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Status:</label>
                                    {/* <input required type="text" className="form-control" placeholder="Enter status" id="status" onChange={handleChange}/> */}
                                    <select className="form-control" defaultValue={props.data.status} onChange={handleChange} id="status">
                                        <option defaultValue>Select Status</option>
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label>Tradeable:</label>
                                    <select className="form-control" defaultValue={props.data.isTradeable} onChange={handleChange} id="isTradeable">
                                        <option defaultValue>Select Tradeable</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Location:</label>
                                    <input required type="text" defaultValue={props.data.location} className="form-control" placeholder="Enter location" id="location" onChange={handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Specification:</label>
                                    <input required type="text" defaultValue={props.data.itemSpecification} className="form-control" placeholder="Enter specification" id="itemSpecification" onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success">Update Item</button>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
        </>
    )
}

export default EditItemModal
