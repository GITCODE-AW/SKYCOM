import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchSearchedProducts } from "../../actions/searchActions";
import { urlConfig } from "../../urlConfig";

function Header() {
    const [Search, setSearch] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSearchSubmit = (e) =>{
        e.preventDefault()
        if (Search){
            dispatch(fetchSearchedProducts(Search))
        navigate(urlConfig.givesearchProductsPage(Search))
        }
    }

    return (
        <header>
            <div className="header-main">
                <div className="container">
                    <Link to={urlConfig.home} className="header-logo">
                        <span>SKYCOM</span>
                    </Link>

                    <div className="header-search-container">
                        <form onSubmit={onSearchSubmit} >
                        <input
                            type="search"
                            name="search"
                            className="search-field"
                            placeholder="Search product in SkyCom"
                            value = {Search}
                            onChange = {(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                            <ion-icon name="search-outline"></ion-icon>
                        </button>
                        </form>
                    </div>

                    <div className="header-user-actions">
                        <Link to={urlConfig.userPanel} >
                            <button className="action-btn">
                                <ion-icon name="person-outline"></ion-icon>
                            </button>
                        </Link>
                        <Link to={urlConfig.CartListPage}>
                            <button className="action-btn">
                                <ion-icon name="bag-handle-outline"></ion-icon>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mobile-bottom-navigation">
                <Link to={urlConfig.userPanel} >
                    <button className="action-btn" data-mobile-menu-open-btn>
                        <ion-icon name="person-outline"></ion-icon>
                    </button>
                </Link>
                <Link to={urlConfig.CartListPage} >
                    <button className="action-btn">
                        <ion-icon name="bag-handle-outline"></ion-icon>
                    </button>
                </Link>
                <Link to={urlConfig.home} >
                    <button className="action-btn">
                        <ion-icon name="home-outline"></ion-icon>
                    </button>
                </Link>
            </div>
        </header>
    );
}

export default Header;
