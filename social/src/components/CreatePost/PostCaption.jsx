import React from 'react'
import { FaCommentAlt,FaEllipsisV, FaGlobe, FaRegCommentAlt, FaRegThumbsUp, FaShare, FaThumbsUp } from 'react-icons/fa'
import Avatar from '../Avatar/Avatar'

const PostCaption = () => {
  return (
    <>
                                
                        <div className="user-info-wrap">
                            <div className="user-info-div">
                                <Avatar></Avatar>
                                <div className="user-info-privacy-wrap">
                                    <h4>Saki Salman</h4>
                                    <p>November 8, 2021 <span><FaGlobe /></span></p>
                                </div>
                            </div>
                            <div className="post-drop">
                                <span><FaEllipsisV /></span>
                            </div>
                        </div>
                        <div className="post-content-area">
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor laboriosam recusandae vitae inventore sed quas officiis molestiae numquam ratione rem?</p>

                            <button>Edit</button>


                        </div>
                        <div className="react-commnet-bar">
                            <div className="react-area">
                                <FaThumbsUp /> <span>120</span>
                            </div>
                            <div className="coment-area">
                                <span>120</span><FaCommentAlt />
                            </div>
                        </div>
                        <div className="like-share-coment-area">
                            <div className="like-area">
                                <FaRegThumbsUp/> <span>Like</span>
                            </div>
                            <div className="comment-area">
                                <FaRegCommentAlt/> <span>Comment</span>
                            </div>
                            <div className="share-area">
                                <FaShare/> <span>Share</span>
                            </div>
                        </div>
                
    
    </>
  )
}

export default PostCaption