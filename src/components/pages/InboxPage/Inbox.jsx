import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Badge} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import * as RiIcons from 'react-icons/ri'
import * as AiIcons from 'react-icons/ai'
import * as HiIcons from 'react-icons/hi'
import { updateMessage, getMessages, deleteMessageById } from '../../../app/actions/MessageActions'
import { getAccountById } from '../../../app/actions/AccountIdActions'
import { getAccount } from '../../../app/actions/AccountActions'
import ComposeModal from '../../layout/ComposeModal';
import moment from 'moment'
import _ from "lodash";

const pageSize = 10;
const Inbox = () => {
    const dispatch = useDispatch()
    const message = useSelector(state => state.message)
    const account = useSelector(state => state.account)
    const accountid = useSelector(state => state.accountid)

    const [isInbox, setIsInbox] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedMessage, setPaginatedMessage] = useState(null)
    const [paginatedCount, setPaginatedCount] = useState()

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

    useEffect(() => {
        setPaginatedMessage(_(message.data && message.data
            .sort((a, b) => a.notification > b.notification ? -1 : 1)
            .sort((a, b) => moment(b.messageDate).toDate() - moment(a.messageDate).toDate())
            .filter(x => (isInbox ? x.receiverId: x.senderId) === 
            parseInt(
            window.localStorage.getItem("creds")
            ?
            window.localStorage.getItem("creds")
            :
            window.sessionStorage.getItem("creds")))
            )
            .slice(0).take(pageSize).value());
        setPaginatedCount((message.data && message.data
            .sort((a, b) => a.notification > b.notification ? -1 : 1)
            .sort((a, b) => moment(b.messageDate).toDate() - moment(a.messageDate).toDate())
            .filter(x => (isInbox ? x.receiverId: x.senderId) === 
            parseInt(
            window.localStorage.getItem("creds")
            ?
            window.localStorage.getItem("creds")
            :
            window.sessionStorage.getItem("creds"))).length
            ));
    }, [message, isInbox])

    const [showComposeModal, setShowComposeModal] = useState(false)
    const pages = _.range(1, (paginatedCount ? Math.ceil(paginatedCount / pageSize) : 0) + 1);

    const handlePagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(message.data && message.data
            .sort((a, b) => a.notification > b.notification ? -1 : 1)
            .sort((a, b) => moment(b.messageDate).toDate() - moment(a.messageDate).toDate())
            .filter(x => (isInbox ? x.receiverId: x.senderId) === 
            parseInt(
            window.localStorage.getItem("creds")
            ?
            window.localStorage.getItem("creds")
            :
            window.sessionStorage.getItem("creds")))
            )
            .slice(startIndex).take(pageSize).value();
        setPaginatedMessage(paginatedPost);
        window.scrollTo(0, 0)
    }

    const handleNext = () => {
        if(pages.length !== currentPage){
            const startIndex = (currentPage) * pageSize;
            const paginatedPost = _(message.data && message.data
                .sort((a, b) => a.notification > b.notification ? -1 : 1)
                .sort((a, b) => moment(b.messageDate).toDate() - moment(a.messageDate).toDate())
                .filter(x => (isInbox ? x.receiverId: x.senderId) === 
                parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")))
                )
                .slice(startIndex).take(pageSize).value();
            setPaginatedMessage(paginatedPost);
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0)
        }
    }
    const handlePrevious = () => {
        if(currentPage !== 1){
            const startIndex = (currentPage - 2) * pageSize;
            const paginatedPost = _(message.data && message.data
                .sort((a, b) => a.notification > b.notification ? -1 : 1)
                .sort((a, b) => moment(b.messageDate).toDate() - moment(a.messageDate).toDate())
                .filter(x => (isInbox ? x.receiverId: x.senderId) === 
                parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")))
                )
                .slice(startIndex).take(pageSize).value();
            setPaginatedMessage(
                paginatedPost);
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0)
        }
    }

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

    const handleDeleteBtn = (id) => {
        console.log(id);
        dispatch(deleteMessageById(id));
        window.location.href = "/browse/inbox"
    }
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
                                    <Button variant={isInbox ? "primary" : "secondary"} className="button-content" onClick={()=> handleInbox()}><RiIcons.RiMailFill className="icons-margin"/>Inbox</Button>
                                    <Button variant={isInbox ? "secondary" : "primary"} className="button-content" onClick={()=> handleSent()}><RiIcons.RiCheckFill className="icons-margin"/>Sent</Button>
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
                                    accountid.data && paginatedMessage &&
                                    paginatedMessage
                                    .map((msg, index) => 
                                    <div key={index} className="inbox-messages-content">
                                        <Accordion>
                                            <Card className="inbox-messages-content-inner m-1">
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
                                                                <Badge variant="secondary">Email :</Badge>
                                                                {
                                                                    account.data &&
                                                                    account.data.filter(x => (isInbox ? msg.senderId : msg.receiverId) === x.id)
                                                                                .map((sender, index)=>
                                                                            <Badge variant="light" className="mr-3" key={index}>
                                                                                {sender.email}
                                                                            </Badge>
                                                                    )
                                                                }
                                                        </div>
                                                        <div className="message-content-time">
                                                            <Badge variant="info">Date :</Badge>
                                                            <Badge variant="light" className="mr-3">{msg.messageDate}</Badge> 
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
                                        <Button variant="danger" className="ml-1 mt-2 inbox-delete-button" onClick={ () => handleDeleteBtn(msg.id)}><AiIcons.AiFillDelete/></Button>
                                    </div>
                                    )
                                }
                                <ComposeModal show={showComposeModal} setShowComposeModal={setShowComposeModal} onHide={() => setShowComposeModal(false)}
                                accounts={account.data}
                                directMessage={false}
                                />
                            </div>
                        </div>
                    </div>
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
            </section>
            
        </div>
    )
}

export default Inbox
