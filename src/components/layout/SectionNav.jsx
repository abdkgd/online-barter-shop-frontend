import React from 'react'
import { Link } from "react-router-dom";
import * as RiIcons from 'react-icons/ri'
const SectionNav = ({name}) => {
    
    const handleLogOut = () => {
        window.localStorage.clear()
        window.sessionStorage.clear()
    }
    
    return (
        <>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top navWrapper">
                <div className="container">
                <Link className="navbar-brand" to={"/"}>スワップ</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/browse/items"}>Shop Items</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/cart"}>My Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/browse/inbox"}>My Inbox</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/browse/sellers"}>View Sellers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/myaccount"}>Account</Link>
                            </li>
                        </ul>
                    </div>
                        <div className="nav-item">
                            <div className="nav-link nav-welcome">Welcome {name}!</div>
                        </div>
                        <a href="/" className="nav-welcome" onClick={() => handleLogOut()}><RiIcons.RiLoginBoxLine /> Log out</a>
                </div>
            </nav>
        </div>
        </>
    )
}

export default SectionNav
