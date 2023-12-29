import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUserState } from "../../slices/userSlice";
import { userRegistrationAction } from "../../actions/userActions";
import LoadingScreen from "../general/LoadingScreen";
import { emptyUserState } from "../../slices/userSlice";
import NotifyBox from "../general/NotifyBox";
import { Link } from "react-router-dom";
import { urlConfig } from "../../urlConfig";

function Register() {
    const userState = useUserState();
    const dispatch = useDispatch();
    const [UserData, setUserData] = useState({
        email: null,
    });

    const onFieldChange = (e) => {
        UserData[e.target.name] = e.target.value;
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(userRegistrationAction(UserData))
        setUserData({ email: 'null' })
    };

    const onNotifyClose = () => {
        dispatch(emptyUserState())
    }

    if (userState.loading) {
        return <LoadingScreen message="Registering the user, please wait" ></LoadingScreen>
    }

    return (
        <>
            {userState.message && <NotifyBox message={userState.message} color={userState.error ? 'red' : 'green'} onClose={onNotifyClose}></NotifyBox> }
            <div className="user-form-wrapper">
                <form onSubmit={onFormSubmit} className="user-form">
                    <span className="user-form-heading">User Registration</span>
                    <input
                        type="email"
                        name="email"
                        onChange={onFieldChange}
                        className="user-form-field"
                        placeholder="Email"
                        required
                    />
                    <button className="user-form-button">Create Account</button>
                    <br />
                    <Link to={urlConfig.verify} >Verify account here</Link>
                </form>
            </div>
        </>
    );
}

export default Register;
