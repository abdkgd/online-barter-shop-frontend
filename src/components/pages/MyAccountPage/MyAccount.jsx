import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountById } from "../../../app/actions/AccountIdActions";
import * as FiIcons from 'react-icons/fi'
import * as AiIcons from 'react-icons/ai'
import MyItemsModal from '../../layout/MyItemsModal';
import EditAccountModal from '../../layout/EditAccountModal';
import { getItems } from "../../../app/actions/ItemActions";
import { IconContext } from 'react-icons'

const MyAccount = () => {

    const dispatch = useDispatch()
    const profile = useSelector(state => state.accountid)
    const items = useSelector(state => state.item)
    
    const [showModalMyItems, setShowModalMyItems] = useState(false)
    const [showModalEditAccount, setShowModalEditAccount] = useState(false)
    useEffect(() => {
        dispatch(getAccountById(parseInt(
        window.localStorage.getItem("creds") 
        ?
        window.localStorage.getItem("creds")
        :
        window.sessionStorage.getItem("creds"))))
    }, [])

    const handleMyItems = (id) => {
        dispatch(getItems())
        console.log(items.data);
        setShowModalMyItems(!showModalMyItems);
    }

    const handleEditAccount = (id) => {
        setShowModalEditAccount(!showModalEditAccount);
    }
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
                                                    <label>First Name:</label><br />
                                                    <label>Last Name:</label><br />
                                                </div>
                                                <div className="col-6">
                                                    <p>{profile.data.firstname}</p>
                                                    <p>{profile.data.lastname}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <label>Username:</label><br />
                                                    <label>Rating:</label><br />
                                                </div>
                                                <div className="col-6">
                                                    <p>{profile.data.username}</p>
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
                                                        ([], 0, profile.data.rating)
                                                    }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <label>Phone Number:</label><br />
                                                    <label>Email:</label><br />
                                                </div>
                                                <div className="col-6">
                                                    <p>{profile.data.phoneNumber}</p>
                                                    <p>{profile.data.email}</p>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 home-photo">
                            <div className="myaccount-img-wrapper">
                                <img src="/images/my-account-3.svg" alt=""/>
                            </div>
                            <div className="myaccount-setting-tag">
                                <label><FiIcons.FiSettings /> Settings</label>
                            </div>
                            <div className="myaccount-config">
                                <div className="button-wrapper">
                                    <Button variant="primary" onClick={() => handleMyItems(profile.data.id)}>Manage Items</Button>
                                    <Button variant="success"  onClick={() => handleEditAccount(profile.data.id)}>Edit Account</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    items.data &&
                    <MyItemsModal show={showModalMyItems} setShow={setShowModalMyItems} onHide={() => setShowModalMyItems(false)} myId={profile.data.id} myName={profile.data.firstname} data={items.data}/>
                }
                {
                    profile.data &&
                    <EditAccountModal show={showModalEditAccount} onHide={() => setShowModalEditAccount(false)} myAccount={profile.data}/>
                }
                </>
            }
        </>
    )
}

export default MyAccount
