import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../../components/Footer'
import ForgotHeader from '../../components/Header/ForgotHeader'
import { resetPassword } from '../../redux/Auth/action'
import { LOADER_START } from '../../redux/TopLoader/loadertypes'
import createToast from '../../Utility/toast'

const ResetPass = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {token} =useParams()
  const [input, setInput] = useState('')
  const userauth = Cookies.get('OTP')

  const {auth} = useSelector(state => state)
  useEffect( () => {

    if (!userauth) {
      navigate('/login')
    }
  })

  // handle Reset Password
  const handleResetPassword = async (e) => {
      e.preventDefault()
      if (!input) {
        return createToast('warn', 'Enter New Password!')
       }
      try {
       
        await axios
          .post(`/api/v1/user/reset-password/${token}`, {password:input })
          .then((res) => {
            createToast("success", res.data.message);
            Cookies.remove('OTP')
            Cookies.remove('findUser')
            dispatch({
              type: LOADER_START,
            });
            navigate("/login");
          })
          .catch((err) => {

            console.log(err);
           createToast("warn", err.response.data.message);
          });
      } catch (error) {
        
        createToast("error", error.message);
      }
  }

  return (
   <>

   <ForgotHeader/>

   {/* reset Box */}
    <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Choose a new password</span>
          </div>
          <div className="reset-body">
            <p>
              Create a new password that is at least 6 characters long. A strong
              password has a combination of letters, digits and punctuation
              marks.
            </p>
            <div className="code-box">
              <input onChange={(e) => setInput(e.target.value)} value={input} className="w-100" type="text" placeholder="New password" />
            </div>
          </div>
          <div className="reset-footer">
            <a href="#"></a>
            <div className="reset-btns">
              <a className="cancel" href="#">Skip</a>
              <a onClick={handleResetPassword} className="continue" href="#">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>

   <Footer/>
   </>
  )
}

export default ResetPass