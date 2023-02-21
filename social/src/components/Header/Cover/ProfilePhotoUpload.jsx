import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Cropper from 'react-easy-crop'
import { useCallback } from 'react'

const ProfilePhotoUpload = () => {
    const [inputImage, setInputImage] = useState([])

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
  
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels)
    }, [])

    // Hanfle input image on change

    const handleInputImge = (e) => {
           let newImge = e.target.files

           setInputImage(Array.from(newImge))
    }   

    console.log(inputImage.length);
  return (
    <>  
        <div className="profile-upload-wrapper">

            <div className="pofile-upload-button">
                {/* <div className="p-upload-button">
                    <label htmlFor="profile-up-btn">
                        <a href=""><FaPlus/><span>Upload Picture</span></a>
                        <input 
                        hidden 
                        type="file" 
                        name="" 
                        id="profile-up-btn"
                        onChange={handleInputImge}/>
                    </label>
                </div> */}
            </div>
            {
                inputImage == '' && <div className="profile-upload-resize-wrapper">
                    <div className="image-resize-wrapper">
                        <div className="profile-photo-description">
                            <textarea name="" id="" placeholder='Description'></textarea>
                        </div>
                        <div className="profile--resize-box">
                            <Cropper
                                image='https://www.newhope.com/sites/newhope360.com/files/uploads/2013/10/team-members-working.jpg'
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
                    </div>
                </div>
            }
           {
               inputImage != '' &&  <div className="suggested-area-wrapper">
                <h4>hi guys</h4>
                </div>
           }
            
        </div>
    </>
  )
}

export default ProfilePhotoUpload