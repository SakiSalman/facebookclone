import React from 'react'
import { useSelector } from 'react-redux'
import avatars from '../../_assets/images/avatar.jpg'


const Avatar = ({url}) => {

   
    const {user} = useSelector(state => state.auth)

    const displayAvatar = () => {
      if (!url) {
          return <img src={avatars} alt="" />
      } 

      if(url){
        return url ? <img src={`/profile/${url}`} alt="" /> : <img src={avatars}/>
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
