import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import Search from '../../layout/Search'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount } from '../../../app/actions/AccountActions'
import { getAccountById } from "../../../app/actions/AccountIdActions";
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'
import ProfileModal from '../../layout/ProfileModal'
import _ from "lodash";
import { IconContext } from 'react-icons'

const pageSize = 5;
const Seller = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.account)
    const userid = useSelector(state => state.accountid)
    const [showModal, setShowModal] = useState(false)
    const [paginatedUsers, setPaginatedUsers] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getAccount());
        console.log(users.data);
        console.log(window.localStorage.getItem("creds"));
    }, [])

    useEffect(() => {
        setPaginatedUsers(_(users.data && users.data.sort((a, b) => a.firstname > b.firstname ? -1 : 1)).slice(0).take(pageSize).value());
    }, [users])


    const handleViewProfile = (id) => {
        console.log(id);
        console.log("CLICKED!");
        dispatch(getAccountById(id))
        console.log(userid.data);
        setShowModal(!showModal);
    }


    const pageCount = users.data ? Math.ceil(users.data.length / pageSize) : 0;
    const pages = _.range(1,pageCount + 1);

    const handlePagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(users.data).slice(startIndex).take(pageSize).value();
        setPaginatedUsers(paginatedPost);
        window.scrollTo(0, 0)
    }

    const handleNext = () => {
        if(pages.length !== currentPage){
            const startIndex = (currentPage) * pageSize;
            const paginatedPost = _(users.data).slice(startIndex).take(pageSize).value();
            setPaginatedUsers(paginatedPost);
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0)
        }
    }
    const handlePrevious = () => {
        if(currentPage !== 1){
            const startIndex = (currentPage - 2) * pageSize;
            const paginatedPost = _(users.data).slice(startIndex ).take(pageSize).value();
            setPaginatedUsers(paginatedPost);
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0)
        }
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
                                    user.id !== parseInt(
                                        window.localStorage.getItem("creds")
                                        ?
                                        window.localStorage.getItem("creds")
                                        :
                                        window.sessionStorage.getItem("creds")
                                    ) &&
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
                                            ([], 0, user.rating)
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
                <ProfileModal show={showModal} onHide={() => setShowModal(false)}>
                        {
                            userid.data &&
                            <div className="row">
                                
                                <div className="col-4 d-flex justify-content-center">
                                    <div className="dpWrapper">
                                        <div className="mb-1">
                                            <label>Profile Photo:</label>
                                        </div>
                                        <img src={userid.data.profilePhoto} alt="" className="dp"/>
                                        
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Username:</label>
                                            <p>Rating:</p>
                                        </div>
                                        <div className="col-6">
                                            <label>{userid.data.username}</label>
                                            <p>
                                                {
                                                    (function (rows, i, len) {
                                                        while (++i <= len) {
                                                        rows.push(<AiIcons.AiTwotoneStar key={i}/>)
                                                        }
                                                        return rows;
                                                    })
                                                    ([], 0, userid.data.rating)
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
                                            <label>{userid.data.firstname}</label>
                                            <p>{userid.data.lastname}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Phone Number:</label>
                                            <p>Email:</p>
                                        </div>
                                        <div className="col-6">
                                            <label>{userid.data.phoneNumber}</label>
                                            <p>{userid.data.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                </ProfileModal>
            </div>
        </div>
        </>
    )
}

export default Seller
