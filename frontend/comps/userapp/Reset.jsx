import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useUserState } from '../../slices/userSlice'
import LoadingScreen from '../general/LoadingScreen'
import NotifyBox from '../general/NotifyBox'
import { urlConfig } from '../../urlConfig'
import { Link } from 'react-router-dom'
import { userPasswordResetAction } from '../../actions/userActions'
import { emptyUserState } from '../../slices/userSlice'

function Reset() {

    const dispatch = useDispatch()
    const userState = useUserState()

    const onNotifyClose = () => {
        dispatch(emptyUserState())
    }

    const [UserData, setUserData] = useState({
        email: null,
    });

    const onFieldChange = (e) => {
        UserData[e.target.name] = e.target.value;
    };

    const onFormSubmit = (e) =>{
        e.preventDefault()
        dispatch(userPasswordResetAction(UserData))
    }

    if (userState.loading) {
        return <LoadingScreen message="Logging in the user, please wait" ></LoadingScreen>
    }
    return (
        <>
            {userState.message && <NotifyBox message={userState.message} color={userState.error ? 'red' : 'green'} onClose={onNotifyClose}></NotifyBox>}
            <div className="user-form-wrapper" onSubmit={onFormSubmit}>
                <form className="user-form">
                    <span className="user-form-heading">Password Reset</span>

                    <input
                        onChange={onFieldChange}
                        className="user-form-field"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    <button className="user-form-button">Send OTP</button>
                    <br />
                    <Link to={urlConfig.reverify} >Verify OTP here</Link>
                </form>
            </div>
        </>
    )
}

export default Reset