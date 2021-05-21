import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { Alert } from 'react-bootstrap'
import { updateAccount } from "../../app/actions/AccountActions";

const EditAccountModal = (props) => {

    const dispatch = useDispatch()
    const [showAlert1, setShowAlert1] = useState(false)
    const [showAlert2, setShowAlert2] = useState(false)


    const [passwordVerify, setPasswordVerify] = useState({
        oldpassword: '',
        reenterpassword: '',
    })

    const [form, setForm] = useState({
        email: props.myAccount.email,
        firstname: props.myAccount.firstname,
        id: props.myAccount.id,
        lastname: props.myAccount.lastname,
        password: props.myAccount.password,
        phoneNumber: props.myAccount.phoneNumber,
        profilePhoto: props.myAccount.profilePhoto,
        username: props.myAccount.username,
        rating: props.myAccount.rating,
        nrating: props.myAccount.nrating
    })

    const [accountImg, setAccountImg] = useState(props.myAccount.profilePhoto)


    const imageHandler = (e) => {
        
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setAccountImg(reader.result)
                setForm({
                    ...form,
                    [e.target.id]: reader.result
                })
            }
        }
        try {
            reader.readAsDataURL(e.target.files[0])
        } catch (error) {
            setAccountImg(props.data.photo);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    };

    const handleChangePassword = (e) => {
        setPasswordVerify({
            ...passwordVerify,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let flag1 = false;
        let flag2 = false;
        if(props.myAccount.password === passwordVerify.oldpassword){
            console.log("OLD PASSWORD MATCH")
            setShowAlert1(false)
            flag1 = true;
        }
        else{
            console.log("OLD PASSWORD NOT MATCH")
            setShowAlert1(true)
            flag1 = false;
        }
        if(form.password === passwordVerify.reenterpassword){
            console.log("NEW PASSWORD MATCH")
            setShowAlert2(false)
            flag2 = true;
        }
        else{
            console.log("NEW PASSWORD NOT MATCH")
            setShowAlert2(true)
            flag2 = false;
        }
        if(flag1 && flag2){
            window.location.href = "/myaccount"
            console.log(form);
            dispatch(updateAccount(form));
            props.setShowModalEditAccount(false)
        }
        
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
                        Edit Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                    <div className="row mb-2">
                                <div className="col-12">
                                    <div className="add-item-modal-image-container">
                                        <label>Update Profile Image</label>
                                        <div className="form-group">
                                            <div className="add-item-image-wrapper">
                                                <img src={accountImg} alt="" className="img border border-dark rounded-circle" />
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
                                    <label>Firstname:</label>
                                    <input required defaultValue={props.myAccount.firstname} type="text" className="form-control" placeholder="Enter firstname" id="firstname" onChange={handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Lastname:</label>
                                    <input required defaultValue={props.myAccount.lastname} type="text" className="form-control" placeholder="Enter lastname" id="lastname" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <label>Email:</label>
                                    <input required defaultValue={props.myAccount.email} type="email" className="form-control" placeholder="example@email.com" id="email" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                    <label>Phone Number:</label>
                                    <input required defaultValue={props.myAccount.phoneNumber} type="tel" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" className="form-control" placeholder="e.g 9999-999-9999" id="phoneNumber" onChange={handleChange}/>
                                </div>
                            </div>
                            {showAlert1 && <Alert variant="danger">Incorrect Password!</Alert>}
                            <div className="row mb-2">
                                <div className="col-12">
                                    <label>Enter Old Password:</label>
                                    <input required type="password" className="form-control" placeholder="Enter old password" id="oldpassword" onChange={handleChangePassword}/>
                                </div>
                            </div>
                            {showAlert2 && <Alert variant="danger">New Password Not Match!</Alert>}
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label>Enter New Password:</label>
                                    <input required type="password" className="form-control" placeholder="Enter password" id="password" onChange={handleChange}/>
                                </div>
                                <div className="col-6">
                                    <label>Reenter New Password:</label>
                                    <input required type="password" className="form-control" placeholder="Reenter password" id="reenterpassword" onChange={handleChangePassword}/>
                                </div>
                            </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success">Update Profile</button>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
        </>
    )
}

export default EditAccountModal
