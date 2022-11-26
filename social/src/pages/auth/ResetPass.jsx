import React from 'react'
import Footer from '../../components/Footer'
import ForgotHeader from '../../components/Header/ForgotHeader'

const ResetPass = () => {
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
              <input className="w-100" type="text" placeholder="New password" />
            </div>
          </div>
          <div className="reset-footer">
            <a href="#"></a>
            <div className="reset-btns">
              <a className="cancel" href="#">Skip</a>
              <a className="continue" href="#">Continue</a>
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