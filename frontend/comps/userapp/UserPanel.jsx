import React, { useState, useEffect } from 'react';
import UserOrderPanelItem from './UserOrderPanelItem';
import UserAddressPanelItem from './UserAddressPanelItem';
import { setIsLoggedIn, useUserState } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { fetchUserInfoAction } from '../../actions/userActions';
import LoadingScreen from '../../comps/general/LoadingScreen';
import { useOrderState } from '../../slices/orderSlice';
import { fetchOrderItemAction } from '../../actions/orderActions';
import { Link, useNavigate } from 'react-router-dom';
import {urlConfig} from '../../urlConfig'
import Cookies from 'js-cookie';

function UserPanel() {
    const [activePanel, setActivePanel] = useState('address');
    const userState = useUserState()
    const orderState = useOrderState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        state: '',
        district: '',
        city: '',
        pincode: '',
        first_name: '',
        last_name: '',
        phone: '',
        sec_phone: '',
        // ... other fields
    });
    

    useEffect(() => {
        // Fetch user info only if not available
        if (!userState.user_info) {
            dispatch(fetchUserInfoAction());
        } else {
            // Set formData with the received user information
            setFormData({
                ...userState.user_info,
            });
        }
    
        if (orderState.order_items.length <= 0) {
            dispatch(fetchOrderItemAction());
        }
    }, [userState.user_info, orderState.order_items.length, dispatch, setFormData]);
    
    const handleOptionClick = (panel) => {
        setActivePanel(panel);
    };

    const handleSignOutClick = () =>{
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        dispatch(setIsLoggedIn(false))
        navigate(urlConfig.home)
    }

    if (!userState.is_logged_in) {
        return <Link to={urlConfig.login} >login to access this cart</Link>
    }

    if (userState.loading) {
        return <LoadingScreen message="loading information, please wait"></LoadingScreen>
    }

    return (
        <div className="user-panel-wrapper">
            <div className="user-panel">
                <div className="user-panel-options">
                    <span
                        className={`user-panel-option ${activePanel === 'address' && 'active'}`}
                        onClick={() => handleOptionClick('address')}
                    >
                        About
                    </span>
                    <span
                        className={`user-panel-option ${activePanel === 'orders' && 'active'}`}
                        onClick={() => handleOptionClick('orders')}
                    >
                        Orders
                    </span>
                    <button className='user-panel-option' onClick={handleSignOutClick} >SignOut here</button>
                </div>
                <div className="user-panel-items">
                    <UserOrderPanelItem className={activePanel === 'orders' ? 'show' : 'hide'} />
                    <UserAddressPanelItem formData={formData} setFormData={setFormData} className={activePanel === 'address' ? 'show' : 'hide'} />
                </div>
            </div>
        </div>
    );
}

export default UserPanel;
