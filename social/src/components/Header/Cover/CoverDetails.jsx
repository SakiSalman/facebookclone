import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../../Avatar/Avatar'
import { FaCamera } from "react-icons/fa";
import './ProfileDetails.css'
import FbModal from '../../Modal/FbModal';
import ProfilePhotoUpload from './ProfilePhotoUpload';
import ProfileImageDropdown from './ProfileImageDropdown';
import usePopupClose from '../../../hooks/usePopupClose';
import PopupFullWidthright from '../../Popups/PopUpFullWidth/PopupFullWidthright';


const CoverDetails = () => {
  
    const {user} = useSelector(state => state.auth)
    const [uploadPopUp, setUploadPopUp] = useState(false)
    const [showDrop , setShowDrop] = useState(false)

    const [profilePopup, setProfilePopup] = useState(false)


    const showProfileDrop = useRef(null)

    usePopupClose(showProfileDrop, setShowDrop)
    
    // handle details modals
  const modalHandler = (e) => {
    setUploadPopUp(!uploadPopUp);
  };

  return (
    <>
        <div className="fb-profile-details">
        <div className="profile-info">
          <div className="profile-photo" onClick={(e) => setShowDrop(!showDrop)}>
            <Avatar url={user.profile_photo}/>

            {
              showDrop && <div className="profile-image-change-drop" ref={showProfileDrop}>
                <ProfileImageDropdown setUploadPopup={setUploadPopUp} setPopup={setProfilePopup}/>
              </div>
            }

            <div className="camera-icons" onClick={modalHandler}>
                <FaCamera/>
            </div>
          </div>
          <div className="profile-desc">
            <h1>{user.first_name + " " + user.sur_name} <span>( neooo inc )</span></h1>
            <div className="profile-follow-details">
              <span className="profile-followers">15k follower</span>
              <span className="profile-following">1k following</span>
            </div>
            <div className="profile-friends-list">
              <ul>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
                <li>
                  <img
                    src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
                    alt=""
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-action">
          <button><span className="follow-icon"></span> <span>Follow</span></button>
          <button>
            <span className="message-icon"></span> <span>Message</span>
          </button>
          <button className='blue'>
            <span className="add-friend-icon"></span> <span>Add friend</span>
          </button>
        </div>
      </div>

            {/* Profile Photo Upload Popup Start */}

                {
                    uploadPopUp && 
                    <FbModal 
                    title={"Update profile picture"} 
                    closmodal={modalHandler}
                    >

                    <ProfilePhotoUpload close={modalHandler}/>

                    </FbModal>
                }
            {/* Profile Photo Upload Popup End */}

          {/* {Profile Photo View Popup Starts} */}
            {
              profilePopup && <PopupFullWidthright data={{
                img : user.profile_photo,
                close : setProfilePopup
              }}>
              </PopupFullWidthright>
            }
          {/* {Profile Photo View Popup End} */}


          
    
    </>
  )
}

export default CoverDetails