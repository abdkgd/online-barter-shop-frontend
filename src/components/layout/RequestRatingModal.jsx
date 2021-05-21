import React, {useState, useEffect} from 'react'
import { Modal, Button, Badge, Alert } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux'
import { updateAccount } from '../../app/actions/AccountActions'

const RequestRatingModal = (props) => {

    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: "",
        firstname: "",
        id: -1,
        lastname: "",
        password: "",
        phoneNumber: "",
        profilePhoto: "",
        username: "",
        rating: -1,
        nrating: -1
    })

    const [comment, setComment] = useState("")

    const ratingChanged = (rating) => {
        console.log(rating);
        for (const acc of props.accounts) {
            if(acc.id === props.ownerId){
                console.log(acc.firstname);
                setForm({
                    email: acc.email,
                    firstname: acc.firstname,
                    id: acc.id,
                    lastname: acc.lastname,
                    password: acc.password,
                    phoneNumber: acc.phoneNumber,
                    profilePhoto: acc.profilePhoto,
                    username: acc.username,
                    rating: acc.rating + rating,
                    nrating: acc.nrating + 1
                })
            }
        }
    }

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(comment);
        console.log(form);
        console.log("RECEIVER: "+props.ownerId)
        console.log("SENDER: "+
        window.localStorage.getItem("creds")
        ?
        window.localStorage.getItem("creds")
        :
        window.sessionStorage.getItem("creds")
        );
        dispatch(updateAccount(form));
        window.location.href = "/cart"
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
                        Ratings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                            <Alert variant="success">Your request has been sent successfully!</Alert>
                            </div>
                            <div className="col-6 rating-wrapper">
                                {
                                    props.accounts.filter(x => x.id === props.ownerId)
                                    .map((acc, index) => 
                                    <div className="add-request-image-wrapper" key={index}>
                                        <Badge variant="dark" className="">Hi I'm {acc.firstname}</Badge>
                                        <img src={acc.profilePhoto} alt="" className="mt-1 mb-3 img border border-dark rounded-circle" />
                                    </div>
                                    )
                                }
                                <div className="mt-3">
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={24}
                                        activeColor="yellow"
                                    />
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">Comment:</label>
                                <textarea name="comment-name" id="comment" cols="20" rows="5" className="form-control"
                                    placeholder="..." onChange={handleComment} />
                            </div>
                        </div>
                        <div className="row">
                            
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-warning">Send</button>
                        <Button onClick={props.onHide} variant="secondary">Skip</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
        </>
    )
}

export default RequestRatingModal
