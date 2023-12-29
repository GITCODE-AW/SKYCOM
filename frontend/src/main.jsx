import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store'


// css imports
import "../styles/general/LoadingScreen.css"
import "../styles/userapp/User.css"
import './index.css'
import '../styles/general/style.css'
import '../styles/productapp/ProductDetail.css'
import '../styles/cartapp/cart.css'
import '../styles/general/SideNotification.css'
import '../styles/userapp/UserPanel.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
