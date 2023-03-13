import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../../components/Avatar/Avatar'
import FriendsCard from '../../../components/Friends/Cards/FriendsCard'
import { getAllUsers } from '../../../redux/Auth/action'
import './FriendsContainer.css'

const FriendsContainer = () => {

    const {users, user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers(user._id))

    }, [dispatch])

  return (
    <>
    
        <div className="friends-container">
            <div className="friends-container-cards">

                <div className="friends-section">
                    <div className="fnds-header">
                        <h4>Friend Requests</h4>
                        <a href="#">See ALL</a>
                    </div>
                    <div className="fnds-cards-wrapper">   

                    {
                        users.map( (data, index) => {
                            
                            if (user.requests.includes(data._id)) {

                                
                                return <FriendsCard users={data} user={user}  buttonState={'request'} key={index}/> 
                            }
                            
                           
                        }) 
                    }
                        
                       
                    </div>

                </div>

                {/* All Friends */}
            </div>


            <div className="friends-section">
                    <div className="fnds-header">
                        <h4>People You May Know</h4>
                        <a href="#">See ALL</a>
                    </div>
                    <div className="fnds-cards-wrapper"> 

                    
                    
                           {
                            users.map( (data, index) => {
                                
                                if (!user.requests.includes(data._id) && !user.friends.includes(data._id)) {
    
                                    
                                    return <FriendsCard users={data} user={user}  buttonState={'mayknow'} key={index}/> 
                                }
                                
                               
                            }) 
                        }
                     
                      
                        
                    </div>

                </div>

                {/* All Friends */}
        </div>
    
    </>
  )
}

export default FriendsContainer