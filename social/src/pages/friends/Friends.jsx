import React from 'react'
import Header from '../../components/Header/Header'
import './Friends.css'
import FriendsContainer from './FriendsContainer/FriendsContainer'
import FriendsMenu from './FriendsMenu/FriendsMenu'

const Friends = () => {
  return (
    <div>
      {/* HJeader */}

      <Header></Header>
      <div className="friends-wrapper">
        <FriendsMenu></FriendsMenu>
        <FriendsContainer></FriendsContainer>
      </div>
    </div>
  )
}

export default Friends
