import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'


const HomeSidebar = () => {

  const {user} = useSelector(state => state.auth)

  
  return (
    <>
              <div className="fb-home-body-sidebar">
        <ul>
          <li>
            <Link to="/profile">
              <div className="body-icon">
              <Avatar/>
              </div>
              <span>{user.first_name}  {user.sur_name}</span>
            </Link>
          </li>
          <li>
            <Link to="/friends">
              <div className="body-icon" />
              <span>Friends</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <div className="body-icon" />
              <span>Groups</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="body-icon" />
              <span>Marketplace</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="body-icon" />
              <span>Watch</span>
            </a>
          </li>
          <li>
            <a href="#">
              <div className="body-icon" />
              <span>Watch</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default HomeSidebar