
import React from 'react'
import { Audio, TailSpin } from  'react-loader-spinner'
import './Preloader.css'

const PreLoaders = ({text}) => {
  return (
    <>
    <div className="pre-loader-wrap">
        <div className="preloader-content">
            <div className="spinner">
            <TailSpin
                height="80"
                width="80"
                color="#039be5"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
            </div>
            <div className="spinner-text">
                <p>{text}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default PreLoaders