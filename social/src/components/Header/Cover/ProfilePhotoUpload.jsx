import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { FaClock, FaCrop, FaMinus, FaPlus } from 'react-icons/fa'
import Cropper from 'react-easy-crop'
import { useCallback } from 'react'
import getCroppedImg from '../../../Utility/cropImage'
import { photoUpdate } from '../../../redux/Auth/action';

const ProfilePhotoUpload = ({close}) => {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);    
    const [inputImage, setInputImage] = useState(null)

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
  
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    // Hanfle input image on change

    const handleInputImge = (e) => {
           let newImge = URL.createObjectURL(e.target.files[0])
           setInputImage(newImge)

    }   
      const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        inputImage,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage)
      setCrop({ x: 0, y: 0 })
      setInputImage(croppedImage)
      setZoom(1)

    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])
  // Save Peofile pgoto to backend
  const handlePtofilePhoto = async ( e) => {

    const croppedImage = await getCroppedImg(
      inputImage,
      croppedAreaPixels,
      rotation
    )
    setCroppedImage(croppedImage)

    try{
        let cropedPhoto = await fetch(croppedImage).then(res => res.blob())
        
        let objectImage = new File([cropedPhoto], 'profile-photo.jpeg', {
          type: '"image/jpeg'
        })

        let data = new FormData()

        data.append('profile', objectImage)

        dispatch(photoUpdate(data, user._id, close))

        

    }catch (err) {
      console.error(e)
    }


  }
  return (
    <>  
        <div className="profile-upload-wrapper">
            {
                !inputImage && <div className="pofile-upload-button">
                <div className="p-upload-button">
                    <label htmlFor="profile-up-btn">
                        <p><FaPlus/><span>Upload Picture</span></p>
                        <input 
                        hidden 
                        type="file" 
                        name="" 
                        id="profile-up-btn"
                        onChange={handleInputImge}/>
                    </label>
                </div>
            </div>
            }
            
            {
                inputImage && <div className="profile-upload-resize-wrapper">
                    <div className="image-resize-wrapper">
                        <div className="profile-photo-description">
                            <textarea name="" id="" placeholder='Description'></textarea>
                        </div>
                        <div className="profile--resize-box">
                            <Cropper
                                image={inputImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1/1}
                                showGrid={false}
                                cropShape={'round'}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                
                            />
                           
                        </div>

                        <div className="resize-slider-wrapper">
                                <span><FaPlus/></span>
                                <span><input type="range" name="" id="" min={1} max={5} step={0.01} value={zoom} onChange={(e) => setZoom(e.target.value)}/></span>
                                <span><FaMinus/></span>
                        </div>
                        <div className="crop-button-wrap">
                            <button onClick={showCroppedImage}><FaCrop/>Crop Photo</button>
                            <button><FaClock/>Male Temporary</button>
                        </div>
                    </div>
                    <div className="profile-upload-footer">
                    <button>Cancel</button>
                    <button className='save-btn' onClick={handlePtofilePhoto}>Save</button>
                    </div>
                </div>
            }
           {/* {
               inputImage &&  <div className="suggested-area-wrapper">
                <h4>hi guys</h4>
                </div>
           } */}
            
        </div>
    </>
  )
}

export default ProfilePhotoUpload