import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from "../../Avatar/Avatar";
import './FriendsCard.css'

const FriendsCard = ({user}) => {

  if (user) {
    return (
      <>
          
          <div className="fnds-card">
            <Link to={''}>
            <Avatar url={user.profile_photo}/>
            </Link>
          <div className="fnds-card-content">
          <Link to={''}>
            <h4>{user.first_name} {user.sur_name}</h4>
          </Link>
          <div className="mutual-icons">
              <Avatar url={user.profile_photo}/>
              <Avatar url={user.profile_photo}/>
              7 Mutual Friends
          </div>
          <div className="fnds-button-area">
              <button className="fnds-confirm">Confirm</button>
              <button className="fnds-delete">Confirm</button>
              <button className="fnds-add">Add Friend</button>
              <button className="fnds-remove">Remove</button>
          </div>
          </div>
          </div>
      </>
    )
  }


}

export default FriendsCard
