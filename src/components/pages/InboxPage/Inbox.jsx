import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Badge} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import * as RiIcons from 'react-icons/ri'
import * as AiIcons from 'react-icons/ai'
import * as HiIcons from 'react-icons/hi'
import { updateMessage, getMessages } from '../../../app/actions/MessageActions'
import { getAccountById } from '../../../app/actions/AccountIdActions'
import { getAccount } from '../../../app/actions/AccountActions'
import ComposeModal from '../../layout/ComposeModal';


const Inbox = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.message)
    const account = useSelector(state => state.account)
    const accountid = useSelector(state => state.accountid)
    const [isInbox, setIsInbox] = useState(true)

    useEffect(() => {
        dispatch(getMessages());
        dispatch(getAccountById(parseInt(
            window.localStorage.getItem("creds") 
            ?
            window.localStorage.getItem("creds")
            :
            window.sessionStorage.getItem("creds")
        )))
        dispatch(getAccount())
        console.log(account);
        // console.log(accountid.data.id);
    }, [])

    const [showComposeModal, setShowComposeModal] = useState(false)

    const handleNotification = (msg) => {
        console.log(msg)
        if(msg.notification === 1){
            dispatch(updateMessage({
                ...msg,
                notification: 0
            }))
        }
    }

    const handleCompose = () => {
        setShowComposeModal(!showComposeModal)
    }
    const handleInbox = () => {
        setIsInbox(true)
    }
    const handleSent = () => {
        setIsInbox(false)
    }

    const handleNothing = () => {}

    return (
        <div className="main-page">
            <section className="section-pagetop bg">
                <div className="container">
                <h2 className="title-page">See your Messages!</h2>
                    <nav>
                        <ol className="breadcrumb text-white">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">My Inbox</li>
                        </ol>  
                    </nav>
                    <div className="main-items">
                        <div className="inbox-content">
                            <div className="inbox-wrapper-options">
                                <div className="breadcrumb">
                                    <Button variant="light" className="button-content" onClick={()=> handleCompose()}><RiIcons.RiMailAddFill className="icons-margin"/> Compose</Button>
                                    <Button variant="secondary" className="button-content" onClick={()=> handleInbox()}><RiIcons.RiMailFill className="icons-margin"/>Inbox</Button>
                                    <Button variant="secondary" className="button-content" onClick={()=> handleSent()}><RiIcons.RiCheckFill className="icons-margin"/>Sent</Button>
                                </div>
                            </div>
                            <div className="inbox-wrapper-messages">
                                <h2>
                                    {
                                        isInbox
                                        ?
                                        <Badge variant="success" className="mb-1" ><RiIcons.RiMailFill className="icons-margin mr-2"/>Message Items</Badge>
                                        :
                                        <Badge variant="success" className="mb-1"><RiIcons.RiCheckFill className="icons-margin mr-2"/>Sent Items</Badge>
                                    }
                                </h2>
                                {
                                    accountid.data && message.data &&
                                    message.data.filter(x => (isInbox ? x.receiverId: x.senderId) === accountid.data.id)
                                            .sort((a, b) => a.messageDate > b.messageDate ? 1 : -1)
                                            .map((msg, index) => 
                                    <Accordion key={index}>
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0" onClick = { isInbox ?
                                                () => handleNotification(msg)
                                                :
                                                () => handleNothing()
                                            }>
                                                <div className="message-content">
                                                    <div className="message-content-details">
                                                        {
                                                            msg.notification === 1 ? 
                                                            <HiIcons.HiMail className="mr-2"/> :
                                                            <HiIcons.HiOutlineMailOpen className="mr-2"/>
                                                        }
                                                            {
                                                                isInbox ? 
                                                                <Badge variant="success">From :</Badge>
                                                                :
                                                                <Badge variant="success">To :</Badge>
                                                            }
                                                            {
                                                                account.data &&
                                                                account.data.filter(x => (isInbox ? msg.senderId : msg.receiverId) === x.id)
                                                                            .map((sender, index)=>
                                                                        <Badge variant="light" className="mr-3" key={index}>
                                                                            {sender.firstname} {sender.lastname}
                                                                        </Badge>
                                                                )
                                                            }
                                                            
                                                    </div>
                                                    <div className="message-content-time">
                                                        <Badge variant="info">Date and Time :</Badge>
                                                        <Badge variant="light" className="mr-3">{msg.messageDate}</Badge> 
                                                        <Badge variant="danger cursor-pointer"><AiIcons.AiFillDelete/></Badge>
                                                    </div>
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <Badge variant="dark">Message :</Badge>
                                                    <br />
                                                    <Badge variant="light">
                                                        {msg.text}
                                                    </Badge>
                                                    
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                    )
                                }
                                <ComposeModal show={showComposeModal} onHide={() => setShowComposeModal(false)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Inbox
