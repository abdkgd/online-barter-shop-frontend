import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import Search from '../../layout/Search'
import Pagination from '../../layout/Pagination.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount } from '../../../app/actions/AccountActions'
import { getAccountById } from "../../../app/actions/AccountIdActions";

import * as MdIcons from 'react-icons/md'
import ProfileModal from '../../layout/ProfileModal'

const Seller = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.account)
    const userid = useSelector(state => state.accountid)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(getAccount())
        console.log(users.data);
        console.log(window.localStorage.getItem("creds"));
    }, [])

    const handleViewProfile = (id) => {
        console.log(id);
        console.log("CLICKED!");
        dispatch(getAccountById(id))
        console.log(userid.data);
        setShowModal(!showModal);
    }
    return (
        <div className="main-page">
            <Search />
            <div className="container TableWrapper">
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
                            users.data &&
                            users.data.map((user, index) => 
                            <tr key={index}>
                                {   
                                    user.id !== parseInt(window.localStorage.getItem("creds")) &&
                                    <>
                                        <td className="profilePhotoWrapper"><img className="profilePhoto" src={user.profilePhoto} alt=""/></td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.rating}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td><Button variant="primary" onClick={() => handleViewProfile(user.id)}><MdIcons.MdViewList /> View Profile</Button></td>
                                    </>
                                }
                            </tr>
                            )}
                    </tbody>
                </Table>
                <div className="paginationWrapper">
                    <Pagination />
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
                                            <p>{userid.data.username}</p>
                                        </div>
                                        <div className="col-6">
                                            <label>Rating:</label>
                                            <p>{userid.data.rating}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>First Name:</label>
                                            <p>{userid.data.firstname}</p>
                                        </div>
                                        <div className="col-6">
                                            <label>Last Name:</label>
                                            <p>{userid.data.lastname}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Phone Number:</label>
                                            <p>{userid.data.phoneNumber}</p>
                                        </div>
                                        <div className="col-6">
                                            <label>Email:</label>
                                            <p>{userid.data.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                </ProfileModal>
            </div>
        </div>
    )
}

export default Seller
