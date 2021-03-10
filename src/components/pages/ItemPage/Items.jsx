import React, { useEffect} from 'react'
import Search from '../../layout/Search.jsx'
import ItemCard from '../../layout/ItemCard.jsx'
import CardDeck from 'react-bootstrap/CardDeck'
import ItemCategory from '../../layout/ItemCategory.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from "../../../app/actions/ItemActions";

const Items = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.item)

    useEffect(() => {
        dispatch(getItems())
    }, [])

    return (
        <div className="main-page">
            <Search />
            <section className="section-pagetop bg">
                <div className="container">
                    <h2 className="title-page">Let's Trade Now!</h2>
                    <nav>
                        <ol className="breadcrumb text-white">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Great articles</li>
                        </ol>  
                    </nav>
                    <div className="main-items">
                        <div className="items-category mr-3">
                            <ItemCategory />
                        </div>
                        <div>
                            <CardDeck>
                                    {
                                        items.data &&
                                        items.data.map((item, index)=>
                                        <div key={index}>
                                            {
                                                item.ownerId !== parseInt(window.localStorage.getItem("creds")) &&
                                                <ItemCard data={item}/>
                                            }
                                        </div>
                                        )
                                    }
                            </CardDeck>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Items
