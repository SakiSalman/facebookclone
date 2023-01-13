import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LOADER_START } from '../../redux/TopLoader/loadertypes'
import createToast from '../../Utility/toast'

const Forgot = () => {  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    auth: ""
  });

  // Handle Input changer

  const handleInputChange = async (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // Search User
  const handleSearch = async (e) => {
    e.preventDefault()

    if (!input.auth) {
      createToast('error', 'All Fields are Required!')
    }else{
      
      try {
        
      await axios.post('/api/v1/user/get-user', input)
      .then( res => {
        dispatch({
          type : LOADER_START
        })
        navigate('/account/find-user')
      })
      .catch( error => {
        createToast('warn', error.response.data.message)
      })
      } catch (err) {
        createToast(err.response.data.message)
      } 
     
    }
  };
  return (
    <>
    <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Find Your Account</span>
          </div>
          <div className="reset-body">
            <p>
              Please enter your email address or mobile number to search for
              your account.
            </p>
            <div className="code-box">
              <input
                className="w-100"
                name='auth'
                type="text"
                placeholder="Email address or mobile number"
                onChange={handleInputChange}
                value={input.auth}
              />
            </div>
          </div>
          <div className="reset-footer">
            <a href="#"></a>
            <div className="reset-btns">
              <Link to={'/login'} className="cancel">Cancel</Link>
              <a onClick={handleSearch} className="continue" href="#">Search</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Forgot