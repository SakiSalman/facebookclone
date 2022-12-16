import React from 'react'

const CreatePost = () => {
  return (
    <>
                  <div className="create-post">
            <div className="create-post-header">
              <img src="./assets/images/user.png" alt="" />
              <button>Whats on your mind ?</button>
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