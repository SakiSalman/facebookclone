import React from 'react'
import {Link} from 'react-router-dom'

const Activated = () => {
  return (
   <>
   <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Acount Activation Success!</span>
          </div>
          <div className="reset-body">
            
            <p> <strong>Hi Ashraf</strong>,
              Your Acount is activation success. Please Login!
            </p>
          </div>
          <div className="reset-footer">
            <div className="reset-btns">
              <Link to={'/login'} className="continue">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Activated