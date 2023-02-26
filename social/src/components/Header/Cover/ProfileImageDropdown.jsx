import React, { useRef } from 'react'
import usePopupClose from '../../../hooks/usePopupClose'

const ProfileImageDropdown = ({setUploadPopup}) => {



    const handlePopup = e => {
        e.preventDefault()

        setUploadPopup(true)
    }
  return (
    <>

            <div className="profile-photo-dropdown">
              <div className="profile-dropdown-wraper">
                  <ul>
                    <li><a href='#'>See Profile Photo</a></li>
                    <li><a href='#' onClick={handlePopup}>Update Profile Photo</a></li>
                  </ul>
              </div>
            </div>
    
    </>
  )
}

export default ProfileImageDropdown