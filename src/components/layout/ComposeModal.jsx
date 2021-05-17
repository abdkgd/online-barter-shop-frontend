import React, {useState, useEffect} from 'react'
import { Modal, Button, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { composeMessage } from '../../app/actions/MessageActions'
import { Alert } from 'react-bootstrap'
import moment from 'moment'

const ComposeModal = (props) => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        setForm({
            to: '',
            message: ''
        })
        setMessageForm({
            text: '',
            messageDate: moment().format('ll'),
            receiverId: 0,
            senderId: parseInt(
                        window.localStorage.getItem("creds")
                        ?
                        window.localStorage.getItem("creds")
                        :
                        window.sessionStorage.getItem("creds")
                        ),
            notification: 1,
        })
    }, [])

    const [dialog, setDialog] = useState(false)
    const [messageForm, setMessageForm] = useState({
        text: '',
        messageDate: moment().format('ll'),
        receiverId: 0,
        senderId: parseInt(
                    window.localStorage.getItem("creds")
                    ?
                    window.localStorage.getItem("creds")
                    :
                    window.sessionStorage.getItem("creds")
                    ),
        notification: 1,
    })

    const [form, setForm] = useState({
        to: '',
        message: ''
    })

    const handleChange = (e) => {
        
        if(!props.directMessage) {
            setForm({
                ...form,
                [e.target.id]: e.target.value
            })
        }
        else {
            setForm({
                ...form,
                to: props.directEmail,
                [e.target.id]: e.target.value
            })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let receiver = -1;
        for (const acc of props.accounts) {
            if(acc.email === form.to)
                receiver = acc.id;
        }
        setMessageForm({
            ...messageForm,
            text: form.message,
            receiverId: receiver
        })
        setDialog(!dialog);
        props.setShowComposeModal(false)
        
    }
    const handleConfirmationYes = () => {
        console.log(messageForm)
        window.location.href = "/browse/inbox"
        dispatch(composeMessage(messageForm));
        
    }
    const handleConfirmationNo = () => {
        setDialog(false)
        props.setShowComposeModal(true)
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
                            Compose Message
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container">
                                {messageForm.receiverId === -1 && <>
                                <div className="row">
                                    <div className="col-12">
                                        <Alert variant="danger">Email does not exist!</Alert>
                                    </div>
                                </div></>}
                                <div className="row">
                                    <div className="col-12 mb-2">
                                        <label htmlFor="to-id"><Badge variant="info">To :</Badge></label>
                                        {
                                            !props.directMessage
                                            ?
                                            <input required type="email" className="form-control" id="to" onChange={handleChange}/>
                                            :
                                            <input required type="email" className="form-control" id="to" value={props.directEmail} disabled/>
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mb-2">
                                        <label htmlFor="message-id"><Badge variant="secondary">Message :</Badge></label>
                                        <textarea name="message-name" id="message" cols="30" rows="10" className="form-control"
                                        placeholder="..." required onChange={handleChange}>
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" variant="success">Send</Button>
                            <Button onClick={props.onHide} variant="danger">Close</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                    <Modal
                        show={dialog}
                        size="sm"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        animation={false}
                        >
                            <Modal.Header>
                                <Modal.Title>Confirmation</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Are you sure you want to send it?</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="danger"  onClick={() => handleConfirmationNo()}>No</Button>
                                <Button variant="success" onClick={() => handleConfirmationYes()}>Yes</Button>
                            </Modal.Footer>
                        </Modal>
        </>
    )
}

export default ComposeModal
