import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { urlConfig } from '../../urlConfig'
import { userVerificationAction } from '../../actions/userActions'
import { useUserState } from '../../slices/userSlice'
import NotifyBox from '../general/NotifyBox'
import LoadingScreen from '../general/LoadingScreen'
import { emptyUserState } from '../../slices/userSlice'

function Verify() {
    const dispatch = useDispatch()
    const userState = useUserState()
    const [UserData, setUserData] = useState({
        email: null,
        password: null,
        otp: null
    })

    const onFieldChange = (e) => {
        UserData[e.target.name] = e.target.value
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        dispatch(userVerificationAction(UserData))
        setUserData({
            email: null,
            password: null,
            otp: null
        })
    }

    const onNotifyClose = () => {
        dispatch(emptyUserState())
    }

    if (userState.loading) {
        return <LoadingScreen message="Verifying the user, please wait..." ></LoadingScreen>
    }

    return (
        <>
            {userState.message && <NotifyBox message={userState.message} color={userState.error ? 'red' : 'green'} onClose={onNotifyClose}></NotifyBox>}
            <div className="user-form-wrapper">
                <form className="user-form" onSubmit={onFormSubmit}>
                    <span className="user-form-heading">Account Verification</span>

                    <input
                        name="email"
                        type="email"
                        onChange={onFieldChange}
                        placeholder="Email"
                        className="user-form-field"
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

                    <input
                        onChange={onFieldChange}
                        className="user-form-field"
                        type="number"
                        name="otp"
                        placeholder="OTP"
                        required
                    />

                    <button className="user-form-button">Set Password</button>
                    <br />

                    <Link to={urlConfig.login}>Login here</Link>
                </form>
            </div>
        </>
    )
}

export default Verify