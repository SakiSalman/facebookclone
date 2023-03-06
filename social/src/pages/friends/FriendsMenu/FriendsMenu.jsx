import React from 'react'
import { Route, Routes, Link } from "react-router-dom";
import { FaSun, FaUser, FaUserAlt, FaUserAltSlash, FaUsers } from "react-icons/fa";
import './FriendsMenu.css'

const FriendsMenu = () => {
  return (
    <>

        <div className="friends-menu-wrapper">
            <div className="friends-menu-header">
                <h2>Friends</h2>
                <span><FaSun></FaSun></span>
            </div>
            <div className="friends-menu-list">

                <ul>
                    <li className="frends-menu-items">
                    <span className='menu-icons'>
                        <FaUsers></FaUsers>
                    </span>
                    <Link to={''}>Home</Link>
                    
                    </li>
                    <li className="frends-menu-items">
                    <span className='menu-icons'>
                    <FaUserAltSlash></FaUserAltSlash>
                                        </span>
                    <Link to={''}>Freind Requests</Link>
                    
                    </li>
                    <li className="frends-menu-items">
                  
                    <span className='menu-icons'>
                    <FaUser></FaUser>
                    </span>
                    <Link to={''}>All Friends</Link>
                    
                    </li>
                </ul>
               
                
            </div>

        </div>
    
    
    </>
  )
}

export default FriendsMenu