import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'

import cross from '../../_assets/icons/cross.png'

const FbModal = ({children, title, closmodal, uploadFeatured, handleBackBtn }) => {
  return (
    <>
      <div className="blur-box">
        <div className="fb-modal-wrapper">
        <div className="fb-modal-popup">
    
                    <div className="fb-modal-header">
                        <span>{title}</span>
                        

                        {
                          closmodal && <button id='close' onClick={closmodal}><img src={cross} alt="" /></button>
                        }
                        {
                          !uploadFeatured && !closmodal  &&  <button id='close' onClick={closmodal}><img src={cross} alt="" /></button>
                        
                        }
                         {
                          uploadFeatured &&  <button onClickCapture={handleBackBtn} className='back-btn-featured' onClick={closmodal}><FaAngleLeft/></button>
                        }
                    </div>
                    <div className="fb-modal-body">
                        {children}
                    </div>
                </div>
        </div>
      </div>
    </>
  )
}

export default FbModal
