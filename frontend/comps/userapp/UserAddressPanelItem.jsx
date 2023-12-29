import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUserState } from "../../slices/userSlice";
import { updateUserInfoAction } from "../../actions/userActions";
import { addNotification } from "../../slices/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";

const UserAddressPanelItem = ({ className, formData, setFormData }) => {
    const userState = useUserState();
    const dispatch = useDispatch()

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInfoAction(formData))
        dispatch(addNotification({
            id : nanoid(),
            status : 'success',
            message : 'Updated user information successfully'
        }))
    };


    return (
        <div className={`user-panel-item ${className}`}>
            <div className="form-container">
                <form method="post" className="your-form" onSubmit={handleSubmit}>
                    <label htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state ? formData.state : ''}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="district">District</label>
                    <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district ? formData.district : ''}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city ? formData.city : ''}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="pincode">Pincode</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode ? formData.pincode : ''}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name ? formData.first_name : ''}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name ? formData.last_name : ''}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="sec_phone">Secondary Phone</label>
                    <input
                        type="tel"
                        id="sec_phone"
                        name="sec_phone"
                        value={formData.sec_phone ? formData.sec_phone : ''}
                        onChange={handleInputChange}
                    />

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default UserAddressPanelItem;
