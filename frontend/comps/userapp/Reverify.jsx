import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { urlConfig } from '../../urlConfig'
import { useUserState } from '../../slices/userSlice'
import NotifyBox from '../general/NotifyBox'
import LoadingScreen from '../general/LoadingScreen'
import { emptyUserState } from '../../slices/userSlice'
import { userReverifyAction } from '../../actions/userActions'

function Reverify() {
    const userState = useUserState()
    const dispatch = useDispatch()

    const [UserData, setUserData] = useState({
        email: null,
        password: null,
        otp: null
    })

    const onFieldChange = (e) => {
        UserData[e.target.name] = e.target.value
    }

    const onNotifyClose = () => {
        dispatch(emptyUserState())
    }

    const onFormSubmit = (e) =>{
        e.preventDefault()
        dispatch(userReverifyAction(UserData))
    }

    if (userState.loading) {
        return <LoadingScreen message="Verifying the user, please wait..." ></LoadingScreen>
    }
    return (
        <>
            {userState.message && <NotifyBox message={userState.message} color={userState.error ? 'red' : 'green'} onClose={onNotifyClose}></NotifyBox>}
            <div className="user-form-wrapper">
                <form className="user-form" onSubmit={onFormSubmit}>
                    <span className="user-form-heading">Password Reset Varification</span>

                    <input
                        onChange={onFieldChange}
                        className="user-form-field"
                        type="email"
                        name="email"
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
                    <Link to={urlConfig.login}>Login Here</Link>
                </form>
            </div>
        </>
    )
}

export default Reverify