import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount } from '../../../app/actions/AccountActions'
import { getItems } from "../../../app/actions/ItemActions";
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'
import ProfileModal from '../../layout/ProfileModal'
import _ from "lodash";
import { IconContext } from 'react-icons'
import MyItemsModal from '../../layout/MyItemsModal'

const pageSize = 5;
const Seller = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.account)
    const items = useSelector(state => state.item)
    const [showModal, setShowModal] = useState(false)
    const [showModalMyItems, setShowModalMyItems] = useState(false)
    const [paginatedUsers, setPaginatedUsers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [userId, setUserId] = useState(-1)
    const [paginatedCount, setPaginatedCount] = useState()

    useEffect(() => {
        dispatch(getAccount());
        dispatch(getItems());
        console.log(users.data);
        console.log(window.localStorage.getItem("creds"));
    }, [])

    useEffect(() => {
        setPaginatedUsers(_(users.data && users.data
            .filter(user => user.id !== parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
            ))
            .sort((a, b) => a.firstname > b.firstname ? -1 : 1))
            .slice(0).take(pageSize).value());
        setPaginatedCount((users.data && users.data
            .filter(user => user.id !== parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
            ))
            .sort((a, b) => a.firstname > b.firstname ? -1 : 1)))
    }, [users])


    const handleViewProfile = (id) => {
        console.log(id);
        setUserId(id);
        setShowModal(!showModal);
    }


    const pageCount = paginatedCount ? Math.ceil(paginatedCount.length / pageSize) : 0;
    const pages = _.range(1,pageCount + 1);

    const handlePagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(users.data
            .filter(user => user.id !== parseInt(
                window.localStorage.getItem("creds")
                ?
                window.localStorage.getItem("creds")
                :
                window.sessionStorage.getItem("creds")
            ))
            .sort((a, b) => a.firstname > b.firstname ? -1 : 1))
            .slice(startIndex).take(pageSize).value();
        setPaginatedUsers(paginatedPost);
        window.scrollTo(0, 0)
    }

    const handleNext = () => {
        if(pages.length !== currentPage){
            const startIndex = (currentPage) * pageSize;
            const paginatedPost = _(users.data
                .filter(user => user.id !== parseInt(
                    window.localStorage.getItem("creds")
                    ?
                    window.localStorage.getItem("creds")
                    :
                    window.sessionStorage.getItem("creds")
                ))
                .sort((a, b) => a.firstname > b.firstname ? -1 : 1))
                .slice(startIndex).take(pageSize).value();
            setPaginatedUsers(paginatedPost);
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0)
        }
    }
    const handlePrevious = () => {
        if(currentPage !== 1){
            const startIndex = (currentPage - 2) * pageSize;
            const paginatedPost = _(users.data
                .filter(user => user.id !== parseInt(
                    window.localStorage.getItem("creds")
                    ?
                    window.localStorage.getItem("creds")
                    :
                    window.sessionStorage.getItem("creds")
                ))
                .sort((a, b) => a.firstname > b.firstname ? -1 : 1))
                .slice(startIndex ).take(pageSize).value();
            setPaginatedUsers(paginatedPost);
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0)
        }
    }

    const handleSellerItemModal = () => {
        setShowModalMyItems(false);
        setShowModal(true);
    }
    return (
        <>
        <div className="main-page">
            <div className = "container TableWrapper">
            <div className = "m-3">
                <h2 className="title-page">View Other Sellers!</h2>
                <nav>
                    <ol className="breadcrumb text-white">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Seller Profile</li>
                    </ol>  
                </nav>
            </div>
                <Table striped bordered variant="light">
                    <thead>
                        <tr>
                            <td>Profile</td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Username</td>
                            <td>Email</td>
                            <td>Rating</td>
                            <td>Phone Number</td>
                            <td>View Profile</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.data && paginatedUsers &&
                            paginatedUsers
                            .map((user, index) => 
                            <tr key={index}>
                                {   
                                    <>
                                        <td className="profilePhotoWrapper"><img className="profilePhoto" src={user.profilePhoto} alt=""/></td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                        {
                                            (function (rows, i, len) {
                                                while (++i <= len) {
                                                rows.push(
                                                <IconContext.Provider key={i} value={{color: 'yellow'}}>
                                                    <AiIcons.AiTwotoneStar/>
                                                </IconContext.Provider>
                                                )
                                            }
                                                return rows;
                                            })
                                            ([], 0, user.rating / user.nrating)
                                        }
                                        </td>
                                        <td>{user.phoneNumber}</td>
                                        <td><Button variant="info" onClick={() => handleViewProfile(user.id)}><MdIcons.MdViewList /> View Profile</Button></td>
                                    </>
                                }
                            </tr>
                            )}
                    </tbody>
                </Table>
                <div className="paginationWrapper">
                    <div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item cursor-pointer" onClick = {() => handlePrevious()}><p className="page-link" >Previous</p></li>
                                {
                                    pages
                                    .map((page, index) => (
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
                <ProfileModal setShowModalMyItems={setShowModalMyItems} show={showModal} setShowModal={setShowModal} onHide={() => setShowModal(false)}>
                        {
                            userId && users.data &&
                            users.data.filter((user) => user.id === userId)
                            .map((user, index) => 
                            <div key={index}>
                            <div className="row">
                                
                                <div className="col-4 d-flex justify-content-center">
                                    <div className="dpWrapper">
                                        <div className="mb-1">
                                            <label>Profile Photo:</label>
                                        </div>
                                        <img src={user.profilePhoto} alt="" className="dp"/>
                                        
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Username:</label>
                                            <p>Rating:</p>
                                        </div>
                                        <div className="col-6">
                                            <label>{user.username}</label>
                                            <p>
                                                {
                                                    (function (rows, i, len) {
                                                        while (++i <= len) {
                                                        rows.push(
                                                        <IconContext.Provider key={i} value={{color: 'yellow'}}>
                                                            <AiIcons.AiTwotoneStar/>
                                                        </IconContext.Provider>
                                                        )
                                                        }
                                                        return rows;
                                                    })
                                                    ([], 0, user.rating / user.nrating)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>First Name:</label>
                                            <p>Last Name:</p>
                                        </div>
                                        <div className="col-6">
                                            <label>{user.firstname}</label>
                                            <p>{user.lastname}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Phone Number:</label>
                                            <p>Email:</p>
                                        </div>
                                        <div className="col-6">
                                            <label>{user.phoneNumber}</label>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                </ProfileModal>
                {
                    items.data && userId && showModalMyItems &&
                    <MyItemsModal isProfileItem={false} show={showModalMyItems} setShow={setShowModalMyItems} onHide={() => handleSellerItemModal()} myId={userId} data={items.data}/>
                }
            </div>
        </div>
        </>
    )
}

export default Seller
