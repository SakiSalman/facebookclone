import React from 'react'
import Avatar from '../Avatar/Avatar'
import CoverDetails from './Cover/CoverDetails'
import CoverImage from './Cover/CoverImage'

const ProfileHeader = () => {

  return (
    <>
      
              {/* <!-- Cover Photo  --> */}
    <div className="fb-profile-header">
      <div className="fb-header-shad"></div>
          {/* Cover Photo */}
          <CoverImage/>
          {/* cover photo details */}
          <CoverDetails/>
      <div className="fb-profile-menu">
        <ul>
          <li><a href="#">Posts</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Followers</a></li>
          <li><a href="#">Photos</a></li>
          <li><a href="#">Videos</a></li>
          <li><a href="#">Articlse</a></li>
          <li><a href="#">More</a></li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default ProfileHeader
