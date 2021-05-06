import React, {useEffect, useState} from 'react'
import Search from '../../layout/Search'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux';
import { getAccount } from '../../../app/actions/AccountActions'
import { getItems } from '../../../app/actions/ItemActions'
import { getCart } from '../../../app/actions/CartActions'
import { Button } from 'react-bootstrap';
import TradeRequestModal from '../../layout/TradeRequestModal';
import { deleteCartById } from "../../../app/actions/CartIdActions";

const Cart = () => {

    const dispatch = useDispatch()
    const accounts = useSelector(state => state.account)
    const items = useSelector(state => state.item)
    const cart = useSelector(state => state.cart)

    const [shoTradeRequestModal, setShoTradeRequestModal] = useState(false)
    

    useEffect(() => {
        dispatch(getAccount())
        dispatch(getItems())
        dispatch(getCart())
        console.log(parseInt(window.localStorage.getItem("creds")))
    }, [])

    const handleTradeRequest = () => {
        setShoTradeRequestModal(!shoTradeRequestModal)
    }

    const handleCancel = (id) => {
        window.location.href = "/cart"
        console.log(id)
        dispatch(deleteCartById(id))
    }
    return (
        <div className="main-page">
            <Search />
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
                                        <th>Transaction</th>
                                        <th>Request</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.data.filter(c => c.requesterId === parseInt(window.localStorage.getItem("creds"))).map((cart, index)=>
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
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={account.profilePhoto} alt=""/></td>)
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
                                                <td>{cart.acceptTrade}</td>
                                                <td>
                                                    {cart.transactionDate}
                                                </td>
                                                <td>
                                                    <Button variant="primary">Messages</Button>
                                                </td>
                                                <td>
                                                    {
                                                            (
                                                            cart.acceptTrade === "Accepted" ? 
                                                                <Button variant="success" disabled>Trade Accepted</Button>
                                                            :
                                                                cart.acceptTrade === "Declined" ? 
                                                                    <Button variant="warning" disabled>Trade Declined</Button>
                                                                    :
                                                                    <Button variant="danger" onClick={() => handleCancel(cart.id)}>Cancel</Button>
                                                            )
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                </Table>
                                <div className="cart-btn-wrapper">
                                    <Button variant="primary" className="mt-2" onClick={() => handleTradeRequest()}>Trade Requests</Button>
                                </div>
                                <TradeRequestModal show={shoTradeRequestModal} onHide={() => setShoTradeRequestModal(false)} cart={cart} accounts={accounts} items={items}/>
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
