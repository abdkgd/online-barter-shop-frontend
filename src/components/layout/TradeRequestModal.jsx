import React, {useState, useEffect} from 'react'
import { Modal, Button, Badge } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { useDispatch } from 'react-redux';
import { updateCart } from "../../app/actions/CartActions";
import { updateItems } from "../../app/actions/ItemActions";
import { deleteCartById } from "../../app/actions/CartIdActions";
import * as RiIcons from 'react-icons/ri'
import * as MdIcons from 'react-icons/md'
import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi'
import ComposeModal from './ComposeModal';
import _ from "lodash";

const pageSize = 5;
const TradeRequestModal = (props) => {

    const dispatch = useDispatch()

    const [dmEmail, setDmEmail] = useState()
    const [showComposeModal, setShowComposeModal] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedTradeRequest, setPaginatedTradeRequest] = useState(null)
    const [paginatedCount, setPaginatedCount] = useState()

    useEffect(() => {  
        setPaginatedTradeRequest(_(props.cart.data
            .filter(c => c.ownerId === parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
                
                )))
            .slice(0).take(pageSize).value())
        setPaginatedCount((props.cart.data
            .filter(c => c.ownerId === parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
                
                ))))
    }, [props.cart])

    const pageCount = paginatedCount ? Math.ceil(paginatedCount.length / pageSize) : 0;
    const pages = _.range(1,pageCount + 1);

    const handlePagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(props.cart.data
            .filter(c => c.ownerId === parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
                
                )))
            .slice(startIndex).take(pageSize).value();
        setPaginatedTradeRequest(paginatedPost);
        window.scrollTo(0, 0)
    }

    const handleNext = () => {
        if(pages.length !== currentPage){
            const startIndex = (currentPage) * pageSize;
            const paginatedPost = _(props.cart.data
                .filter(c => c.ownerId === parseInt(
                    window.localStorage.getItem("creds")
                    ?
                    window.localStorage.getItem("creds")
                    :
                    window.sessionStorage.getItem("creds")
                    
                    )))
                .slice(startIndex).take(pageSize).value();
            setPaginatedTradeRequest(paginatedPost);
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0)
        }
    }
    const handlePrevious = () => {
        if(currentPage !== 1){
            const startIndex = (currentPage - 2) * pageSize;
            const paginatedPost = _(props.cart.data
                .filter(c => c.ownerId === parseInt(
                    window.localStorage.getItem("creds")
                    ?
                    window.localStorage.getItem("creds")
                    :
                    window.sessionStorage.getItem("creds")
                    
                    )))
                .slice(startIndex).take(pageSize).value();
            setPaginatedTradeRequest(paginatedPost);
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0)
        }
    }

    const handleTransaction = (res, uCart) => {
        if(res === "ACCEPTED"){
            console.log(res);
            let reqItem = props.items.data.filter(item => item.id === uCart.requesterItemId).map(x => x);
            let ownItem = props.items.data.filter(item => item.id === uCart.ownerItemId).map(x => x);
            console.log({
                ...ownItem[0],
                status: "Sold",
                isTradeable: "false"
            })
            console.log({
                ...reqItem[0],
                status: "Sold",
                isTradeable: "false"
            });
            dispatch(updateCart({
                ...uCart,
                acceptTrade: "Accepted"
            }));
            window.location.href = "/cart"
            dispatch(updateItems(
                {
                    ...ownItem[0],
                    status: "Sold",
                    isTradeable: "false"
                }
            ));
            dispatch(updateItems(
                {
                    ...reqItem[0],
                    status: "Sold",
                    isTradeable: "false"
                }
            ));
            
        }
        else{
            console.log(res);
            window.location.href = "/cart"
            dispatch(updateCart({
                ...uCart,
                acceptTrade: "Declined"
            }))
        }
    }

    const handleRemove = (id) => {
        console.log(id)
        dispatch(deleteCartById(id))
        window.location.href = "/cart"
    }

    const handleDM = (id) => {
        console.log(id)
        for (const acc of props.accounts.data) {
            if(acc.id === id)
                setDmEmail(acc.email);
        }
        setShowComposeModal(true)
        props.setShoTradeRequestModal(false)
    }

    const handleComposeModalHide = () => {
        console.log("close compose modal");
        props.setShoTradeRequestModal(true)
        setShowComposeModal(false)
    }
    
    return (
        <>
            <Modal
                show={props.show}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
                >
                
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Trade Request from Other Seller
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                            <Table striped bordered variant="light">
                                <thead>
                                    <tr>
                                        <th>Owner</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Trader</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Trade Status</th>
                                        <th>Transaction</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        paginatedTradeRequest &&
                                        paginatedTradeRequest
                                        .map((cart, index)=>
                                            <tr key={index}>
                                                {
                                                    props.accounts.data
                                                    .filter(account => account.id === cart.requesterId)
                                                    .map((account, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={account.profilePhoto} alt=""/></td>)
                                                }
                                                {
                                                    props.items.data
                                                    .filter(item => item.id === cart.requesterItemId)
                                                    .map((item, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={item.photo} alt=""/></td>)
                                                }
                                                {
                                                    props.items.data
                                                    .filter(item => item.id === cart.requesterItemId)
                                                    .map((item, i) => 
                                                    <td key={i}>¥{item.price}</td>)
                                                }
                                                {
                                                    props.accounts.data
                                                    .filter(account => account.id === cart.ownerId)
                                                    .map((account, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={account.profilePhoto} alt=""/></td>)
                                                }
                                                {
                                                    props.items.data
                                                    .filter(item => item.id === cart.ownerItemId)
                                                    .map((item, i) => 
                                                    <td key={i} className="profilePhotoWrapper" ><img className="profilePhoto" src={item.photo} alt=""/></td>)
                                                }
                                                {
                                                    props.items.data
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
                                                <td>
                                                    {
                                                        cart.acceptTrade === "Pending" ?
                                                        <>
                                                            <Button variant="success" onClick={() => handleTransaction("ACCEPTED", cart)}>
                                                            
                                                            <AiIcons.AiOutlineCheckCircle className="mr-1"/>
                                                                Accept</Button>
                                                            <Button variant="danger" className="ml-2" onClick={() => handleTransaction("DECLINED", cart)}>
                                                            
                                                            <BiIcons.BiErrorCircle className="mr-1"/>
                                                                Decline</Button>
                                                        </>
                                                        :
                                                        <>
                                                            <Button variant="secondary" className="ml-2"  onClick={() => handleDM(cart.requesterId)}>
                                                                <RiIcons.RiMessage2Fill className="mr-1"/>
                                                                Message
                                                                </Button>
                                                            <Button variant="danger" className="ml-2" onClick={() => handleRemove(cart.id)}>
                                                                <MdIcons.MdCancel className="mr-1"/>
                                                                Remove</Button>
                                                        </>
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
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={props.onHide} variant="danger">Close</Button>
                    </Modal.Footer>
                </Modal>
                <ComposeModal show={showComposeModal} setShowComposeModal={setShowComposeModal} onHide={() => handleComposeModalHide()}
                                                            accounts={props.accounts.data}
                                                            directMessage={true}
                                                            directEmail={dmEmail}
                                                            />
        </>
    )
}

export default TradeRequestModal
