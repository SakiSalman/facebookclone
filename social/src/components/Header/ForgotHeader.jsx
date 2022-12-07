import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../../_assets/icons/facebook.svg'

const ForgotHeader = () => {
  return (
    <>    
    <div className="reset-header">
    <div className="reset-header-wraper">
      <div className="reset-logo">
      <Link to={'/'}>  <img src={logo} alt="" /></Link>
      </div>
      <div className="login-part">
        <input type="text" placeholder="Email or mobile number" />
        <input type="text" placeholder="Password" />
        <button>Log In</button>
        <Link to={'/forgot-password'}>Forgotten account?</Link>
      </div>
    </div>
  </div>
  </>
  )
}

export default ForgotHeader;