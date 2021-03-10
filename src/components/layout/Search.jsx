import React from 'react'
import * as BsIcons from 'react-icons/bs'

const Search = () => {
    return (
        <>
            <div className="container SearchWrapper col-lg-6 col-sm-12">
                <form action="#" className="search">
                    <div className="input-group w-100">
                        <input type="text" className="form-control" placeholder="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-dark" type="submit">
                                <BsIcons.BsSearch />
                                </button>
                            </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Search
