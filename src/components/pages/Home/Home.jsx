import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { getAccount } from '../../../app/actions/AccountActions'
import { getItems } from "../../../app/actions/ItemActions";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAccount());
        dispatch(getItems());
    }, [])

    return (
        <div className="main-page">
            <div className="row homeWrapper">
                <div className="col-6 home-content">
                    <div className="home-content-wrapper">
                        <div className="home-topline">
                        スワップ
                        </div>
                        <h1 className="home-headline">
                            BARTER SYSTEM
                        </h1>
                        <p className="home-description">We allow individuals to trade items that they own while keeping their cash on hand.</p>
                        <Link to={"/"}><Button variant="dark">EXCHANGE NOW!</Button></Link>
                    </div>
                </div>
                <div className="col-6 home-photo">
                    <div className="home-img-wrapper">
                        <img src="/images/home-1.svg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
