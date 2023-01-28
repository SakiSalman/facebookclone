import React from 'react'
import cross from '../../_assets/icons/cross.png'

const FbModal = ({children, title, closmodal}) => {
  return (
    <>
      <div className="blur-box">
        <div className="fb-modal-wrapper">
        <div className="fb-modal-popup">
                    <div className="fb-modal-header">
                        <span>{title}</span>
                        <button onClick={closmodal}><img src={cross} alt="" /></button>
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
