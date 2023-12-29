import React from 'react'
import { Link } from 'react-router-dom';
import { urlConfig } from '../../urlConfig';

function SideBarItem({ category }) {
    return (
        <Link to={urlConfig.giveProductsByCategory(category.id)} >
            <li className="sidebar-menu-category">
                <button className="sidebar-accordion-menu" data-accordion-btn>
                    <div className="menu-title-flex">
                        <p className="menu-title">{category.category_name}</p>
                    </div>
                </button>
            </li>
        </Link>
    )
}

export default SideBarItem;