import React, {useEffect}from 'react'
import { Route, Switch } from 'react-router'
import SectionFooter from '../layout/SectionFooter.jsx'
import SectionNav from '../layout/SectionNav.jsx'
import Home from './Home/Home.jsx'
import Items from './ItemPage/Items.jsx'
import MyAccount from './MyAccountPage/MyAccount.jsx'
import Seller from './SellerPage/Seller.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAccountById } from "../../app/actions/AccountIdActions";
import Cart from './CartPage/Cart.jsx'
import Inbox from './InboxPage/Inbox.jsx'


const Pages = () => {

    const dispatch = useDispatch()
    const profile = useSelector(state => state.accountid)
    
    useEffect(() => {
        if(parseInt(window.localStorage.getItem("creds"))){
            dispatch(getAccountById(parseInt(window.localStorage.getItem("creds"))))
        }
        else{
            dispatch(getAccountById(parseInt(window.sessionStorage.getItem("creds"))))
        }
    }, [])

    return (
        <>
        {
            profile.data &&
            <SectionNav name={profile.data.firstname}/>
        }
        <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/browse/sellers" render={() => <Seller />} />
            <Route path="/browse/items" render={() => <Items />} />
            <Route path="/browse/inbox" render={() => <Inbox />} />
            <Route path="/myaccount" render={() => <MyAccount />} />
            <Route path="/cart" render={() => <Cart />} />
        </Switch>
        <SectionFooter />
        </>
        
    )
}
export default Pages
