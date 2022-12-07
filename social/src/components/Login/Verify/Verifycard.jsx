import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import { useEffect } from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { resendOtp, userVerificationByOTP } from '../../../redux/Auth/action'
import createToast from '../../../Utility/toast'

const Verifycard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const useremail = cookie.get('OTP')
  const [code, setCode] = useState('')
// navigate to login
useEffect( () => {
  if (!useremail) {
    navigate('/login')
  }
})
// cancel activation
const handleActivationCancel = (e) => {
  e.preventDefault()
  cookie.remove('OTP')
  navigate('/login')
}

/**
 * handle code continuue
 */
const handleCodeSubmit = (e) => {
    e.preventDefault()
    if (!code) {
      createToast('warn', 'Enter you OTP code First!')
    }else{

      dispatch(userVerificationByOTP({
        code : code,
        auth : useremail
      }, navigate))

      
    }
}
const handleResendCode = (e) => {
    e.preventDefault()
    dispatch(resendOtp({auth : useremail}))
}
  return (
    
    <>
    <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Enter security code</span>
          </div>
          <div className="reset-body">
            <p>
              Please check your emails for a message with your code. Your code
              is 6 numbers long.
            </p>
            <div className="code-box">
              <input onChange={(e) => setCode(e.target.value)} type="text" value={code}/>
              <div className="code-text">
                <span>We sent your code to: </span>
                <strong>{useremail}</strong>
              </div>
            </div>
          </div>
          <div className="reset-footer">
            <a onClick={handleResendCode} href="#">Didn't get a code?</a>
            <div className="reset-btns">
              <Link to={'/login'} onClick={handleActivationCancel} className="cancel" href="#">Cancel</Link>
              <a onClick={handleCodeSubmit} className="continue" href="#">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>

</>)
}

export default Verifycard