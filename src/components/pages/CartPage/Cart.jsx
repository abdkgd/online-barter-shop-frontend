import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from '../../../app/actions/AccountActions'
import { getItems } from '../../../app/actions/ItemActions'
import { getCart } from '../../../app/actions/CartActions'
import { Button, Badge } from 'react-bootstrap';
import TradeRequestModal from '../../layout/TradeRequestModal';
import { deleteCartById } from "../../../app/actions/CartIdActions";
import * as RiIcons from 'react-icons/ri'
import * as MdIcons from 'react-icons/md'
import * as AiIcons from 'react-icons/ai'
import ComposeModal from '../../layout/ComposeModal';

import _ from "lodash";

const pageSize = 5;
const Cart = () => {

    const dispatch = useDispatch()
    const accounts = useSelector(state => state.account)
    const items = useSelector(state => state.item)
    const cart = useSelector(state => state.cart)

    const [dmEmail, setDmEmail] = useState()
    const [showComposeModal, setShowComposeModal] = useState(false)
    const [shoTradeRequestModal, setShoTradeRequestModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedCart, setPaginatedCart] = useState(null)
    const [paginatedCount, setPaginatedCount] = useState()


    useEffect(() => {
        dispatch(getAccount())
        dispatch(getItems())
        dispatch(getCart())
        console.log(parseInt(window.localStorage.getItem("creds")))
    }, [])

    useEffect(() => {
        setPaginatedCart(_(cart.data && cart.data
            .filter(c => c.requesterId === parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
                )))
            .slice(0).take(pageSize).value())
        setPaginatedCount((cart.data && cart.data
            .filter(c => c.requesterId === parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
                ))))
    }, [cart])

    const pageCount = paginatedCount ? Math.ceil(paginatedCount.length / pageSize) : 0;
    const pages = _.range(1,pageCount + 1);

    const handlePagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(cart.data && cart.data
            .filter(c => c.requesterId === parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
                )))
            .slice(startIndex).take(pageSize).value();
        setPaginatedCart(paginatedPost);
        window.scrollTo(0, 0)
    }

    const handleNext = () => {
        if(pages.length !== currentPage){
            const startIndex = (currentPage) * pageSize;
            const paginatedPost = _(cart.data && cart.data
                .filter(c => c.requesterId === parseInt(
                    window.localStorage.getItem("creds")
                    ?
                    window.localStorage.getItem("creds")
                    :
                    window.sessionStorage.getItem("creds")
                )))
                .slice(startIndex).take(pageSize).value();
            setPaginatedCart(paginatedPost);
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0)
        }
    }
    const handlePrevious = () => {
        if(currentPage !== 1){
            const startIndex = (currentPage - 2) * pageSize;
            const paginatedPost = _(cart.data && cart.data
                .filter(c => c.requesterId === parseInt(
                    window.localStorage.getItem("creds")
                    ?
                    window.localStorage.getItem("creds")
                    :
                    window.sessionStorage.getItem("creds")
                    )))
                .slice(startIndex ).take(pageSize).value();
            setPaginatedCart(paginatedPost);
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0)
        }
    }

    const handleTradeRequest = () => {
        setShoTradeRequestModal(!shoTradeRequestModal)
    }

    const handleCancel = (id) => {
        dispatch(deleteCartById(id))
        console.log(id)
        window.location.href = "/cart"
    }

    const handleDM = (id) => {
        console.log(id)
        console.log("HEY!");
        for (const acc of accounts.data) {
            if(acc.id === id)
                setDmEmail(acc.email);
        }
        setShowComposeModal(true)
    }
    return (
        <div className="main-page">
            <section className="section-pagetop bg">
                <div className="container">
                    <h2 className="title-page">See your Requests!</h2>
                    <nav>
                        <ol className="breadcrumb text-white">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Cart</li>
                        </ol>  
                    </nav>
                    <div className="main-items">
                        <div className="container">
                            {
                                cart.data && items.data && accounts.data &&
                                <>
                                <Table striped bordered variant="light">
                                <thead>
                                    <tr>
                                        <th>Owner</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Seller</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Trade Status</th>
                                        <th>Trade Date</th>
                                        <th>Messages</th>
                                        <th>Request</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginatedCart &&
                                        paginatedCart
                                        .map((cart, index)=>
                                            <tr key={index}>
                                                {
                                                    accounts.data
                                                    .filter(account => account.id === cart.requesterId)
                                                    .map((account, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={account.profilePhoto} alt=""/></td>)
                                                }
                                                {
                                                    items.data
                                                    .filter(item => item.id === cart.requesterItemId)
                                                    .map((item, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={item.photo} alt=""/></td>)
                                                }
                                                {
                                                    items.data
                                                    .filter(item => item.id === cart.requesterItemId)
                                                    .map((item, i) => 
                                                    <td key={i}>¥{item.price}</td>)
                                                }
                                                {
                                                    accounts.data
                                                    .filter(account => account.id === cart.ownerId)
                                                    .map((account, i) => 
                                                    <td key={i} className="profilePhotoWrapper" >
                                                        <img className="profilePhoto" src={account.profilePhoto} alt=""/>
                                                    </td>)
                                                }
                                                {
                                                    items.data
                                                    .filter(item => item.id === cart.ownerItemId)
                                                    .map((item, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={item.photo} alt=""/></td>)
                                                }
                                                {
                                                    items.data
                                                    .filter(item => item.id === cart.ownerItemId)
                                                    .map((item, i) => 
                                                    <td key={i}>¥{item.price}</td>)
                                                }
                                                
                                                <td>
                                                    {
                                                    cart.acceptTrade === "Pending" 
                                                    ?
                                                    <Badge variant="warning" className="mb-1" >{cart.acceptTrade}</Badge>
                                                    :
                                                    cart.acceptTrade === "Accepted"
                                                    ?
                                                    <Badge variant="success" className="mb-1" >{cart.acceptTrade}</Badge>
                                                    :
                                                    <Badge variant="danger" className="mb-1" >{cart.acceptTrade}</Badge>
                                                    }
                                                </td>
                                                <td>{cart.transactionDate}</td>
                                                <td>
                                                    <Button variant="secondary" onClick={() => handleDM(cart.ownerId)}>
                                                        <RiIcons.RiMessage2Fill className="mr-1"/>
                                                        Messages
                                                    </Button>
                                                </td>
                                                <td>
                                                    {
                                                            (
                                                            cart.acceptTrade === "Accepted" ? 
                                                                <Button variant="success" disabled>Trade Accepted</Button>
                                                            :
                                                                cart.acceptTrade === "Declined" ? 
                                                                    <Button variant="danger" disabled>Trade Declined</Button>
                                                                    :
                                                                    <Button variant="danger" onClick={() => handleCancel(cart.id)}>
                                                                        <MdIcons.MdCancel className="mr-1"/>
                                                                        Cancel</Button>
                                                            )
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                </Table>
                                <div className="paginationWrapper">
                                    <div>
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item cursor-pointer" onClick = {() => handlePrevious()}><p className="page-link" >Previous</p></li>
                                                {
                                                    pages.map((page, index) => (
                                                        <li key={index} className= {page === currentPage ? "page-item active" : "page-item"}>
                                                            <p className="page-link cursor-pointer" onClick = {() => handlePagination(page)}>{page}</p>
                                                        </li>
                                                    ))
                                                }
                                                <li className="page-item cursor-pointer" onClick = {() => handleNext()}><p className="page-link">Next</p></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="cart-btn-wrapper">
                                    <Button variant="primary" className="mt-2" onClick={() => handleTradeRequest()}>
                                        <AiIcons.AiOutlineBranches className="mr-1"/>
                                        Trade Requests</Button>
                                </div>
                                <TradeRequestModal show={shoTradeRequestModal} setShoTradeRequestModal={setShoTradeRequestModal} onHide={() => setShoTradeRequestModal(false)} cart={cart} accounts={accounts} items={items}/>
                                <ComposeModal show={showComposeModal} setShowComposeModal={setShowComposeModal} onHide={() => setShowComposeModal(false)}
                                                            accounts={accounts.data}
                                                            directMessage={true}
                                                            directEmail={dmEmail}
                                                            />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart
