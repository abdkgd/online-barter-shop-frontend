import React, { useEffect, useState} from 'react'
import ItemCard from '../../layout/ItemCard.jsx'
import CardDeck from 'react-bootstrap/CardDeck'
import ItemCategory from '../../layout/ItemCategory.jsx'
import * as BsIcons from 'react-icons/bs'

import { useDispatch, useSelector } from 'react-redux'
import { getItems } from "../../../app/actions/ItemActions";
import _ from "lodash";

const pageSize = 8;
const Items = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.item)

    const [category, setCategory] = useState("All")
    const [paginatedItems, setPaginatedItems] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("")

    useEffect(() => {
        dispatch(getItems());
    }, [])

    useEffect(() => {
        setPaginatedItems(_(items.data).slice(0).take(pageSize).value());
    }, [items])


    const pageCount = items.data ? Math.ceil(items.data.length / pageSize) : 0;
    const pages = _.range(1,pageCount + 1);

    const handlePagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginatedPost = _(items.data).slice(startIndex).take(pageSize).value();
        setPaginatedItems(paginatedPost);
        window.scrollTo(0, 0)
    }

    const handleNext = () => {
        if(pages.length !== currentPage){
            const startIndex = (currentPage) * pageSize;
            const paginatedPost = _(items.data).slice(startIndex).take(pageSize).value();
            setPaginatedItems(paginatedPost);
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0)
        }
    }
    const handlePrevious = () => {
        if(currentPage !== 1){
            const startIndex = (currentPage - 2) * pageSize;
            const paginatedPost = _(items.data).slice(startIndex ).take(pageSize).value();
            setPaginatedItems(paginatedPost);
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0)
        }
    }




    return (
        <div className="main-page">
            <div className="container SearchWrapper col-lg-6 col-sm-12">
                <form className="search">
                    <div className="input-group w-100">
                            <input type="text" className="form-control" placeholder="Search" id="searchbar" onChange={(event) => setSearch(event.target.value)}/>
                    </div>
                </form>
            </div>
            <section className="section-pagetop bg">
                <div className="container">
                    <h2 className="title-page">Let's Trade Now!</h2>
                    <nav>
                        <ol className="breadcrumb text-white">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Shop Items</li>
                        </ol>  
                    </nav>
                    <div className="main-items">
                        <div className="items-category mr-3">
                            <ItemCategory setCategory={setCategory}/>
                        </div>
                        <div>
                            <CardDeck>
                                    {
                                        
                                        items.data && paginatedItems &&
                                        (
                                            category === "All"
                                            ?
                                            paginatedItems
                                            .filter((item) => {
                                                if(search === ""){
                                                    return item
                                                }
                                                else if(
                                                    item.description.toLowerCase().includes(search.toLowerCase())
                                                    ||
                                                    item.location.toLowerCase().includes(search.toLowerCase())
                                                    ||
                                                    item.status.toLowerCase().includes(search.toLowerCase())
                                                    ){
                                                    return item
                                                }
                                            })
                                            .map((item, index)=>
                                            <div key={index}>
                                                {
                                                    item.ownerId !== parseInt(
                                                        window.localStorage.getItem("creds")
                                                        ?
                                                        window.localStorage.getItem("creds")
                                                        :
                                                        window.sessionStorage.getItem("creds")
                                                    ) &&
                                                    <ItemCard data={item}/>
                                                }
                                            </div>
                                            )
                                            :
                                            paginatedItems
                                            .filter(x => x.category === category)
                                            .filter((item) => {
                                                if(search === ""){
                                                    return item
                                                }
                                                else if(
                                                    item.description.toLowerCase().includes(search.toLowerCase())
                                                    ||
                                                    item.location.toLowerCase().includes(search.toLowerCase())
                                                    ||
                                                    item.status.toLowerCase().includes(search.toLowerCase())
                                                    ){
                                                    return item
                                                }
                                            })
                                            .map((item, index)=>
                                            <div key={index}>
                                                {
                                                    item.ownerId !== parseInt(
                                                    window.localStorage.getItem("creds")
                                                    ?
                                                    window.localStorage.getItem("creds")
                                                    :
                                                    window.sessionStorage.getItem("creds"))
                                                    &&
                                                    <ItemCard data={item}/>
                                                }
                                            </div>
                                            )
                                        )
                                        
                                    }
                            </CardDeck>
                        </div>
                    </div>
                </div>
                            <div className="paginationWrapper mt-5 mr-5">
                                <div>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item cursor-pointer"><p className="page-link" onClick = {() => handlePrevious()}>Previous</p></li>
                                            {
                                                pages.map((page, index) => (
                                                    <li key={index} className= {page === currentPage ? "page-item active" : "page-item"}>
                                                        <p className="page-link cursor-pointer" onClick = {() => handlePagination(page)}>{page}</p>
                                                    </li>
                                                ))
                                            }
                                            <li className="page-item cursor-pointer"><p className="page-link" onClick = {() => handleNext()}>Next</p></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
            </section>
        </div>
    )
}

export default Items
