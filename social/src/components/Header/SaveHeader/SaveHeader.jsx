import React from 'react'
import { FaGlobeAsia } from 'react-icons/fa'
import './SaveHeader.css'

const SaveHeader = ({saveCover, closeAll}) => {
  return (
    <>

        <div className="save-header-wrapper">
            <div className="save-header-container">
              <div className="save-heade-left">
                <FaGlobeAsia></FaGlobeAsia> <span>Your cover photo is public</span>


              </div>
              <div className="save-heade-right">
                <button onClick={closeAll}>Cancel</button>
                <button className='cover-save' onClick={saveCover}>Save</button>
              </div>
            </div>
        </div>
    
    
    </>
  )
}

export default SaveHeader