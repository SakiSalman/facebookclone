import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar/Avatar'

const ProfileHeader = () => {
    const {user} = useSelector(state => state.auth)

  return (
    <>
      
              {/* <!-- Cover Photo  --> */}
    <div class="fb-profile-header">
      <div class="fb-header-shad"></div>
      <div class="fb-cover-photo">
        <img
          src="https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-1323206.jpg&fm=jpg"
          alt=""
        />
        <button><span class="camera-icon"></span> Edit cover photo</button>
      </div>
      <div class="fb-profile-details">
        <div class="profile-info">
          <div class="profile-photo">
            <Avatar/>
          </div>
          <div class="profile-desc">
            <h1>{user.first_name} {user.sur_name} <span>( neooo inc )</span></h1>
            <div class="profile-follow-details">
              <span class="profile-followers">15k follower</span>
              <span class="profile-following">1k following</span>
            </div>
            <div class="profile-friends-list">
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
        <div class="profile-action">
          <button><span class="follow-icon"></span> <span>Follow</span></button>
          <button>
            <span class="message-icon"></span> <span>Message</span>
          </button>
          <button>
            <span class="add-friend-icon"></span> <span>Add friend</span>
          </button>
        </div>
      </div>
      <div class="fb-profile-menu">
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
