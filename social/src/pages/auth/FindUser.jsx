import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from '../../components/Footer'
import ForgotHeader from '../../components/Header/ForgotHeader'
import avatar from '../../_assets/images/avatar.jpg'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import { replaceData } from '../../Utility/helper.js'
import createToast from '../../Utility/toast'


const FindUser = () => {

const navigate = useNavigate()
// user data states
const [userData, setuserData] = useState({
  name : '',
  email : '',
  mobile : '',
  photo : ''
})

useEffect(() => {
  const user = JSON.parse(cookie.get('findUser')) ?? null
  if (user) {
      setuserData({
        name : user.name,
        email : user.email ?? null,
        mobile : user.mobile ?? null,
        photo : user.photo ?? null
      })
  }
});

  
  // handle backpage
  const handleBackPage = () => {
    cookie.remove('OTP')
    navigate('/forgot-password')
  }
  // handle Continue

  const handleContinue = async (e) => {
      e.preventDefault()

      try {
        axios.post('/api/v1/user/forgot-password', {auth : userData.email ?? userData.mobile})
        .then(
          res => {
            
            createToast('success', res.data.message)
            navigate(`/account-verify`)
          }
        )
        .catch( err => {
          console.log(err.response.data.message);
        })
      } catch (error) {
        createToast('warn', error.message)
      }
      
      
  }
return (
    <>
        {/* Foorer header */}
        <ForgotHeader/>
            {/* user find box */}

      <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Reset your password</span>
          </div>
          <div className="reset-body">
            <div className="find-user-account">
              <img src={userData.photo ?? avatar } alt="" />
              <span>{userData.name}</span>
              
              {
                userData.email && <p>Email : {replaceData(userData.email)} </p>
              }
              {
                userData.mobile && <p>Mobile :{replaceData(userData.mobile)}</p>
              }

              <p>To reset your account password, please continue</p>
            </div>
          </div>
          <div className="reset-footer">
            <a href="#"></a>
            <div className="reset-btns">
              <a onClick={handleBackPage} className="cancel" href="#">Not you ?</a>
              <a className="continue" href="#" onClick={handleContinue}>Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>

            
        {/* Footer */}
        <Footer/>
    </>
  )
}

export default FindUser