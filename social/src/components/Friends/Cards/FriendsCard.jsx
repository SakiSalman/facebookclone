import axios, { Axios } from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendFriendReq, updateFriendsData } from '../../../redux/Auth/action';
import Avatar from "../../Avatar/Avatar";
import './FriendsCard.css'

const FriendsCard = ({user, users, buttonState}) => {

  const dispatch = useDispatch()
  // Handle user COnfirm
  const handleConfirm = async () => {
    
    if (user) {
        dispatch(updateFriendsData(user._id,users._id))
    }
    
  }
  // Handle user COnfirm
  const handleSendReq = async () => {
    
    if (user) {
        dispatch(sendFriendReq(user._id,users._id))
    }
    
  }
  
  if (users ) {
    return (
      <>
          <div className="fnds-card">
            <Link to={''}>
            <Avatar url={users.profile_photo}/>
            </Link>
          <div className="fnds-card-content">
          <Link to={''}>
            <h4>{users.first_name} {users.sur_name}</h4>
          </Link>
          <div className="mutual-icons">
              <Avatar url={users.profile_photo}/>
              <Avatar url={users.profile_photo}/>
              7 Mutual Friends
          </div>
          <div className="fnds-button-area">

            {
              buttonState === 'request' && <>
              
              <button className="fnds-confirm" onClick={handleConfirm}>Confirm</button>
              <button className="fnds-delete">Delete</button>

              </>
            }
            {
             buttonState === 'mayknow' && <>
              <button className="fnds-add" onClick={handleSendReq}>Add Friend</button>
              <button className="fnds-remove">Remove</button>
              
              </>
            }
              
          </div>
          </div>
          </div>
      </>
    )
  }


}

export default FriendsCard
