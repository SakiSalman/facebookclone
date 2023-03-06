import React, { useState } from 'react'
import { FaGlobe, FaSmile } from 'react-icons/fa'
import Avatar from '../Avatar/Avatar'
import FbModal from '../Modal/FbModal'
import upPhtoto from '../../_assets/icons/photo.png'
import flag from '../../_assets/icons/flag.png'
import smile from '../../_assets/icons/smile.png'
import taguser from '../../_assets/icons/adtag.png'
import cross from '../../_assets/icons/cross.png'


const CreatePost = () => {

  const [openPostPopup, setOpenPostPopup] = useState(false)
  const [close, setClose] = useState(false)
  return (
    <>
                  <div className="create-post">
            <div className="create-post-header">
              <Avatar />
              <button onClick={() => setOpenPostPopup(!openPostPopup)}>What's on your mind ?</button>

              {
                openPostPopup && <FbModal title={'Create Post'} closmodal={()=> setOpenPostPopup(!openPostPopup)}>

                 <div className="create-post-wrapper">
                  <div className="create-post-user-info">
                    <Avatar/>
                    <div className="user-info-box">
                      <h5>Saki Salman</h5>
                      <div className="pricacy-area">

                      <span><FaGlobe/></span>
                        <span>Public</span>
                      </div>
                    </div>
                  </div>
                  <div className="create-post-text-area">
                    <textarea placeholder="What's on your mind?" name="post" id="" cols="30" rows="5">

                    </textarea>
                    <div className="create-post-imoji-area">
                      <FaSmile/>
                    </div>

                    {
                      close && <div className="photo-upload-area">
                      <label htmlFor="postphtoto">
                         <div className="post-img-upload-wrapper">
                         
                          <span className='up-bg'> <img src={upPhtoto} alt="" /></span>
                              <div className="img-description">
                              <span><h5>Add Photos and Videos</h5></span>
                              <span>or drag and drop images</span>
                              </div>
                              <input hidden type="file" name="" id="postphtoto" />
                            </div>
                          </label>
  
                          <div className="ip-photo-close">
                            <button id='close-up' onClick={() => setClose(!close)}><img src={cross} alt="" /></button>
                          </div>
                      </div>
                    }
               
                    
                  </div>
                  <div className="create-post-post-type-wrapper">
                    <div className="create-post-type-title">

                        <p>Add to your post</p>

                    </div>
                    <div className="create-post-type-icons">
                        <img onClick={() => setClose(!close)} src={upPhtoto} alt="" />
                        <img src={flag} alt="" />
                        <img src={smile} alt="" />
                        <img src={taguser} alt="" />
                    </div>
                  </div>
                  <div className="create-post-button">
                    <button className='post-btn'>Post</button>
                  </div>
                 </div>


                </FbModal>
              }
            </div>
            <div className="divider-0" />
            <div className="create-post-footer">
              <ul>
                <li>
                  <div className="post-icon" />
                  <span>Live Video</span>
                </li>
                <li>
                  <div className="post-icon" />
                  Photo/video
                </li>
                <li>
                  <div className="post-icon" />
                  Feeling/ctivity
                </li>
              </ul>
            </div>
          </div>
    </>
  )
}

export default CreatePost