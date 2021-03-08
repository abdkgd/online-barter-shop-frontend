import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top navWrapper">
                <div className="container">
                <Link className="navbar-brand" to={"/"}>スワップ</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/signin"}>Sign in</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/signup"}>Sign up</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
