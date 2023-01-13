import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Login from '../../components/Login/Login'
import RegisterModal from '../../components/RegisterModal'
import logo from '../../_assets/icons/facebook.svg'


const LoginPage = () => {
      // modal handler
  const [modal, setModal] = useState(false)
  return (
    <>
    {/* Facebook Auth Area */}
    <div className="fb-auth">
      <div style={{width : "auto"}} className="auth-wraper">
        <div   className="auth-right">
        <img src={logo} alt="" />
        
          <Login setModal={setModal}/>
          <p><a href="/">Create a Page</a> for a celebrity, brand or business.</p>
        </div>
      </div>
    </div>

    {/* Registration modal */}
    {
      modal && <RegisterModal setModal={setModal}/>
    }
    {/* FB FOOTER AREA  */}
    <Footer/>
  </>
  )
}

export default LoginPage
