import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../urlConfig";
import LoadingScreen from "../general/LoadingScreen";
import NotifyBox from "../general/NotifyBox";
import { emptyUserState, useUserState } from "../../slices/userSlice";
import { userLoginAction } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Login() {
    const userState = useUserState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [UserData, setUserData] = useState({
        username: null,
        password: null,
    })

    useEffect(() => {
        if (userState.is_logged_in){
            navigate(urlConfig.home)
        }
    }, [userState.is_logged_in]);

    const onFormSubmit = (e) =>{
        e.preventDefault()
        dispatch(userLoginAction(UserData))
    }

    const onFieldChange = (e) => {
        UserData[e.target.name] = e.target.value;
    };

    const onNotifyClose = () => {
        dispatch(emptyUserState())
    }

    if (userState.loading) {
        return <LoadingScreen message="Logging in the user, please wait" ></LoadingScreen>
    }

    return (
        <>
            {userState.message && <NotifyBox message={userState.message} color={userState.error ? 'red' : 'green'} onClose={onNotifyClose}></NotifyBox>}
            <div className="user-form-wrapper">
                <form className="user-form" onSubmit={onFormSubmit}>
                    <span className="user-form-heading">User Login</span>
                    <input
                        onChange={onFieldChange}
                        className="user-form-field"
                        type="email"
                        name="username"
                        placeholder="Email"
                        required
                    />

                    <input
                        onChange={onFieldChange}
                        className="user-form-field"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />

                    <button className="user-form-button">Login</button>
                    <br />
                    <Link to={urlConfig.register} >dont have account? create here</Link>
                    <Link to={urlConfig.reset} >forgot password ? reset here</Link>
                </form>
            </div>
        </>

    );
}

export default Login;
