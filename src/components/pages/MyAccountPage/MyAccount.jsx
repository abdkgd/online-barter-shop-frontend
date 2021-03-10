import React, {useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountById } from "../../../app/actions/AccountIdActions";
import * as FiIcons from 'react-icons/fi'

const MyAccount = () => {

    const dispatch = useDispatch()
    const profile = useSelector(state => state.accountid)

    useEffect(() => {
        dispatch(getAccountById(parseInt(window.localStorage.getItem("creds"))))
    }, [])

    return (
        <>
            {
                profile.data &&
                <>
                <div className="main-page">
                    <div className="row">
                        <div className="col-6">
                            <div className="container d-flex justify-content-center align-content-center">
                                <div className="myaccount-content-wrapper">
                                    <div className="row myaccount-tag">
                                        <div className="d-flex flex-column align-items-center">
                                            <div className="myaccount-dp-wraper">
                                                <img src={profile.data.profilePhoto} alt=""/>
                                            </div>
                                            <div>
                                                MY PROFILE
                                            </div>
                                        </div>
                                        <div className="myaccount-photo-wrapper">
                                            <img src="/images/my-account-2.svg" alt=""/>
                                        </div>
                                    </div>
                                    <div className="container myaccount-details">
                                            <div className="row">
                                                <div className="col-6">
                                                    <label>First Name:</label>
                                                    <p>{profile.data.firstname}</p>
                                                </div>
                                                <div className="col-6">
                                                    <label>Last Name:</label>
                                                    <p>{profile.data.lastname}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <label>Username:</label>
                                                    <p>{profile.data.username}</p>
                                                </div>
                                                <div className="col-6">
                                                    <label>Rating:</label>
                                                    <p>{profile.data.rating}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <label>Phone Number:</label>
                                                    <p>{profile.data.phoneNumber}</p>
                                                </div>
                                                <div className="col-6">
                                                    <label>Email:</label>
                                                    <p>{profile.data.email}</p>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 home-photo">
                            <div className="myaccount-img-wrapper">
                                <img src="/images/my-account-1.svg" alt=""/>
                            </div>
                            <div className="myaccount-setting-tag">
                                <label><FiIcons.FiSettings /> Settings</label>
                            </div>
                            <div className="myaccount-config">
                                <div className="button-wrapper">
                                    <Button variant="dark">View Items</Button>
                                    <Button variant="success">Edit Account</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }
        </>
    )
}

export default MyAccount
