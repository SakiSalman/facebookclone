import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { coverPhotoUpdate } from "../../../redux/Auth/action";
import getCroppedImg from "../../../Utility/cropImage";
import FbModal from "../../Modal/FbModal";
import SaveHeader from "../SaveHeader/SaveHeader";

const CoverImage = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const [coverUpload , setCoverUpload] = useState(false)
  const [imageUpload , setImageUpload] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1.01)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

// crop image
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        photo,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage)
      setCrop({ x: 0, y: 0 })
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])


  // handle cover image save
  const handleCoverImage = async () => {


    const croppedImage = await getCroppedImg(
      photo,
      croppedAreaPixels,
      rotation
    )
    setCroppedImage(croppedImage)

    try{
        let cropedPhoto = await fetch(croppedImage).then(res => res.blob())
        
        let objectImage = new File([cropedPhoto], 'cover-photo.jpeg', {
          type: '"image/jpeg'
        })
        
        let formData = new FormData()

        formData.append('coverphoto', objectImage)

        // send data to database
      dispatch(coverPhotoUpdate(formData, user._id, setCoverUpload))

    }catch (e) {
      console.error(e)
    }


  }

  const handleCoverPopup = () => {
    setCoverUpload(!coverUpload)
    setImageUpload(!imageUpload)
  }

// hanfle cover image input change
const handleCoverInputChange = (e) => {
  const url = URL.createObjectURL(e.target.files[0])

  setPhoto(url)
  setImageUpload(!imageUpload)


}

// handle modal close
const modalHandler = () => {
  setImageUpload(false)
  setCoverUpload(false)
  setPhoto('')
}

  return (
    <>  
      {
        coverUpload && <SaveHeader saveCover={handleCoverImage} closeAll = {modalHandler}></SaveHeader>
      }
      <div className="fb-cover-photo">

        {
          !coverUpload && <img
          src={`/profile/cover/${user.cover_photo}`}
          alt=""
        />
        }
        {
          coverUpload && <div className="cover-cropper-wrapper">
                <Cropper
                image={photo}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={6 / 3}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                cropSize={{width:1280, height:500}}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
        />
          </div>
        }
          {
            !coverUpload && <button onClick={handleCoverPopup}>
            
            <span className="camera-icon"></span> Edit cover photo
          </button>
          }
      </div>

      {
        imageUpload && 
        <FbModal 
        title={"Update profile picture"} 
        closmodal={modalHandler}
        >
          <div className="upload-cover-photo">
            <label htmlFor="coverphoto-upload">
              <p>Upload Cover Photo</p>
            <input type="file" name="" id="coverphoto-upload" hidden onChange={handleCoverInputChange}/>

            </label>
          
          </div>

        </FbModal>
      }
    </>
  );
};

export default CoverImage;
