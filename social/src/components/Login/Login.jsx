import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../redux/Auth/action'
import createToast from '../../Utility/toast'

const Login = ({setModal}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


const [input, setInput] = useState({
    auth : '',
    password : ''
  })

// Update input 
const updateInput = (e) => {
  
  setInput((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
}

// Handle user login submit
const handleUserLogin = (e) => {
  e.preventDefault()
  if (!input.auth || !input.password) {
    createToast('warn', 'All Fields Are Required!')
  }else{
    dispatch(loginUser({
      auth: input.auth,
      password : input.password
    },
    navigate))
  }
}
  
  return (
    <>
    <div className="auth-box">
                  <form action="#">
                    <div className="auth-form">
                      <input onChange={ updateInput} name="auth" value={input.auth} type="text" placeholder="Email address or phone number" />
                    </div>
                    <div className="auth-form">
                      <input onChange={  updateInput} name="password" value={input.password} type="password" placeholder="Password" />
                    </div>
                    <div className="auth-form">
                      <button onClick={handleUserLogin} type="submit">Log In</button>
                    </div>                        
                  </form>
                  <Link to={'/forgot-password'}>Forgotten password?</Link>
                  <div className="divider" />
                  <button onClick={(e) => setModal(true)}>Create  New Account</button>
                </div>
    </>
  )
}

export default Login
