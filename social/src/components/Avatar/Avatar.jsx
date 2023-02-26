import React from 'react'
import { useSelector } from 'react-redux'
import avatars from '../../_assets/images/avatar.jpg'


const Avatar = ({url}) => {
    const {user} = useSelector(state => state.auth)

    const displayAvatar = () => {
      if (!user) {
          return <img src={avatars} alt="" />
      } 

      if(user){
        return user.profile_photo ? <img src={`/profile/${user.profile_photo}`} alt="" /> : <img src={avatars}/>
      }
    }
  return (
    <>

      {
        displayAvatar()
      }
      
    </>
  )
}

export default Avatar;
