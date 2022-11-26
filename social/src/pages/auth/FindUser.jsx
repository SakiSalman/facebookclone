import React from 'react'
import Footer from '../../components/Footer'
import ForgotHeader from '../../components/Header/ForgotHeader'
import avatar from '../../_assets/images/user.png'
const FindUser = () => {
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
              <img src={avatar} alt="" />
              <span>Asraful Haque</span>
              <p>To reset your account password, please continue</p>
            </div>
          </div>
          <div className="reset-footer">
            <a href="#"></a>
            <div className="reset-btns">
              <a className="cancel" href="#">Not you ?</a>
              <a className="continue" href="#">Continue</a>
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