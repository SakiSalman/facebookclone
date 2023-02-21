import React, { useEffect, useRef, useState } from "react";
import FbCard from "../Fb-card/FbCard";
import wave from "../../_assets/icons/wave.png";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaGlobeAmericas,
  FaPencilAlt,
  FaTrash,
  FaRegCircle,
  FaPenAlt,
  FaPen,
  FaPenFancy,
} from "react-icons/fa";
import { profileDataUpdate } from "../../redux/Auth/action";
import FbModal from "../Modal/FbModal";
import ClickUpdate from "../ClickUpdate/ClickUpdate";
import PopupFullWidth from "../Popups/PopUpFullWidth/PopupFullWidth";
import StorySlider from "../StorySlider/StorySlider";
import axios from "axios";
import { FEATURED_IMAGE_UPDATE } from "../../redux/Auth/authType";
import PreLoaders from "../preloader/PreLoaders";

const ProfileIntro = () => {

  const [preloader, setPreloader] = useState(false)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [bioShow, setBioShow] = useState(false);
  const [disable, setDisable] = useState(true);
  const [bio, setBio] = useState(user.bio);
  const [remain, setRemain] = useState(
    101 - (bio.length === 0 ? 0 : bio.length)
  );

  const [details, setDetails] = useState(false);
  const [catShow, setCatShow] = useState(false);
  const [cateData, setCateData] = useState(user.category ? user.category : "");
  const [jobShow, setJobShow] = useState(false);
  const [job, setJob] = useState(user.work ? user.work : []);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const [edu, setEdu] = useState(user.edu ? user.edu : []);
  const [institute, setInstitute] = useState("");
  const [eduShow, setEduShow] = useState(false);

  const [city, setCity] = useState(user.living ? user.living : "");
  const [country, setCountry] = useState("");
  const [cityShow, setCityShow] = useState(false);

  const [homeShow, setHomeShow] = useState(false);
  const [home, setHome] = useState(user.home_town ? user.home_town : "");
  const [town, setTown] = useState("");

  const [featuredShow, setFeaturedShow] = useState(false);

  const [showHide, setShowHide] = useState(false);

  const [uploadFeatureShow, setUploadFeatureShow] = useState(false);
  const [upFeatureColection, setUpFeatureColection] = useState(false);

  const [postImages, setPostImages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [images , setImages] = useState([])


  const [editFeatured, setEditFeatured] = useState(false)

  // handle details modals
  const modalHandler = () => {
    setDetails(!details);
  };
  const saveBtn = useRef(null);
  const handleEditBio = () => {
    setBioShow(!bioShow);
  };
  const handleBioCancel = () => {
    setBioShow(!bioShow);
  };

  const handleBioChange = (e) => {
    if (remain < 0) {
      setDisable(true);
      setRemain(101 - e.target.value.length);
      saveBtn.current.classList.remove("bio_save_btn");
    } else {
      setBio(e.target.value);
      setRemain(101 - e.target.value.length);
      setDisable(false);
      saveBtn.current.classList.add("bio_save_btn");
    }
  };

  // Profile Data update

  const handleBioUpdate = (e) => {
    e.preventDefault();

    dispatch(profileDataUpdate({ bio }, user._id, setBioShow, bioShow));

    setDisable(true);
  };

  // HJandle Popup Show

  const handleShow = (e) => {
    e.preventDefault();

    setCatShow(!catShow);
  };
  // Show Job Area
  const handleJobShow = (e) => {
    e.preventDefault();
    setJobShow(!jobShow);
  };
  // handle category update
  const handleUpdatecate = () => {
    dispatch(profileDataUpdate({ category: cateData }, user._id, setCatShow));
  };
  // handle Job update
  const handleUpdatejob = () => {
    dispatch(
      profileDataUpdate(
        { work: [...user.work, { position, company }] },
        user._id,
        setJobShow
      )
    );
  };
  // handle Job Remove
  const handleJobRemove = (company) => {
    let filterItems = user.work.filter((data) => data.company !== company);

    dispatch(profileDataUpdate({ work: filterItems }, user._id, setJobShow));
  };

  // Show edu Area
  const handleEduShow = (e) => {
    e.preventDefault();
    setEduShow(!eduShow);
  };
  // handle education update
  const handleEduUpdate = () => {
    dispatch(
      profileDataUpdate({ edu: [...user.edu, edu] }, user._id, setEduShow)
    );
  };

  // handle Edu Remove
  const handleEduRemove = (edu) => {
    let filterEdu = user.edu.filter((data) => data !== edu);

    dispatch(profileDataUpdate({ edu: filterEdu }, user._id, setEduShow));
  };

  // Show City Area
  const handleCityShow = (e) => {
    e.preventDefault();
    setCityShow(!cityShow);
  };

  // handle City Update
  const handleCityUpdate = (e) => {
    e.preventDefault();

    if (!city || !country) {
      return alert("Set Country and City Both!");
    }
    let livingTown = city + "," + country;
    dispatch(profileDataUpdate({ living: livingTown }, user._id, setEduShow));

    // handle City remove
  };
  const handleLivingRemove = (e) => {
    e.preventDefault();
    dispatch(profileDataUpdate({ living: null }, user._id, setEduShow));
  };
  // Show City Area
  const handleHomeShow = (e) => {
    e.preventDefault();
    setHomeShow(!homeShow);
  };
  // Update Home towb
  const handleTownUpdate = (e) => {
    e.preventDefault();

    let homeTowm = home + "," + country;
    dispatch(profileDataUpdate({ home_town: homeTowm }, user._id, setEduShow));
  };
  // handle Home Town remove

  const handleHomeRemove = (e) => {
    e.preventDefault();
    dispatch(profileDataUpdate({ home_town: null }, user._id, setEduShow));
  };
  // handle Joined In Facebook Reveal
  const getJoinedDate = (createdat) => {
    let data = new Date(user.createdAt);
    let options = {
      month: "long",
    };
    let year = data.getFullYear();
    let month = data.toLocaleDateString("en-us", options);

    let joined_date = month + ", " + year;
    return joined_date;
  };

  // handle featured modal back
  const handleFeaturedBack = () => {
    setFeaturedShow(true);
    setUploadFeatureShow(false);
    setPostImages([]);
  };

  // handle featured modal back
  const handleUploadBack = () => {
    setUpFeatureColection(false);
  };

  // Hanfle featured iamge preview

  const handlePreview = (e) => {
    let newImages = e.target.files;

    let newArray = Array.from(newImages);

    setPostImages((prev) => [...prev, ...newArray]);

    setSelected((prev) => [...prev, ...newArray]);
  };

  // hanfdle change Items

  const handleChangeItems = (e) => {
    const updateList = [...selected];

    const val = postImages.find((data) => data.name == e.target.value);
    if (selected.includes(val)) {
      updateList.splice(updateList.indexOf(val), 1);
    } else {
      updateList.push(val);
    }
    console.log(selected);
    setSelected(updateList);
  };
  // hanfle edit featured image modal
  const hadleEditUploadPhtos = (e) => {
    e.preventDefault();
    if (postImages.length === 0) {
      return alert("Please Upload Featured Images");
    } else {
      setUpFeatureColection(true);
    }
  };

  const handleCollectionTitle = (e) => {
    setCollectionTitle(e.target.value);
  };

  // Handle featured slider items upload
  const handleFeaturedSliders = () => {

    setPreloader(!preloader)
    const data = new FormData();
    data.append("name", collectionTitle);
    let count = 1;
    selected.forEach((items) => {
      data.append("file", items);
      data.append("upload_preset", 'test_upload');
      data.append("cloud_name", 'dagtq9wgf');

      axios.post(
        `https://api.cloudinary.com/v1_1/dagtq9wgf/image/upload`,
        data
      ).then(res => {
        

        setImages((prev)=>([...prev, res.data.url]))
        if (count >= selected.length) {
          setPreloader(false)
         handleSendData()
        }

        count++

      }).catch(err =>{
        console.log(err);
      });
    });

    // send image info to database

  };
// send data to database and cloud
const handleSendData = async () => {

   try {
      await axios.post(`http://localhost:5050/api/v1/user/featured-slider/${user._id}`, {
      collection : collectionTitle,
      slider : images
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
   } catch (error) {
    
   }

}
// Call Handle Submit Form handler
const handleSubmitUpload = (e) => {

  handleFeaturedSliders()
}


  const [sliderIndex, setSliderIndex] = useState([]);
  const handleFeaturedSlider = (e, items, id) => {
    e.preventDefault();

    setShowHide(!showHide);
    setSliderIndex(user.featured[id].sliders);
  };

  // handle edit featured Modal

  const [editSelected, setEditSelected] = useState('')
  const [ids, setIds] = useState('')
  const [feturedEditData, setFeaturedEditData] = useState([])

  const handleEditFeaturedModal = (e, id) => {
    e.preventDefault()
    setIds(id)
    setEditFeatured(true)
    setEditSelected(user.featured[id])
    setFeaturedEditData(user.featured[id].sliders)
    
    
  }

  // handle edit item change
  const handleEditUpdate = (e) => {
    const updateList = [...editSelected.sliders];


    const val = feturedEditData.find((data) => data === e.target.value);
    if (editSelected.sliders.includes(val)) {
      updateList.splice(updateList.indexOf(val), 1);
    } else {
      updateList.push(val);
    }

   setEditSelected({...editSelected, sliders : updateList})

   

  };

  // Handle Edit Featured Upload
  const handleEditFeaturedUpload = (e) => {
      e.preventDefault()
      axios.patch(
        `http://localhost:5050/api/v1/user/edit-featured-slider/${user._id}`,
        {sliderId :ids,
        sliders : editSelected}
      ).then(res => {
        setUpFeatureColection(false)
        setEditFeatured(false)
        setShowHide(false)
        dispatch({
          type : FEATURED_IMAGE_UPDATE,
          payload : res.data.user
        })
      }).catch(err =>{
          console.log(err);
      });

      
     
  }

  return (

    <>

    {
      preloader && <PreLoaders text={'Uploading...'}/>
    }
    
    <FbCard>
      <h3>Intro</h3>
      <div className="bio">
        {user.bio && !bioShow && (
          <>
            <p>{user.bio}</p>
            <button href="#" onClick={handleEditBio}>
              Edit Bio
            </button>
          </>
        )}
        {!user.bio && !bioShow && (
          <>
            <button href="#" onClick={handleEditBio}>
              Add Bio
            </button>
          </>
        )}

        {bioShow && (
          <div className="click-update">
            <textarea
              placeholder="Describe Who are You?"
              onChange={handleBioChange}
            >
              {bio}
            </textarea>
            <p>{remain}/101 charackter Remaining</p>
            <div className="click_update_btn">
              <div className="bio_status">
                <i>
                  <FaGlobeAmericas /> Public
                </i>
              </div>
              <div className="bio_btn">
                <button onClick={handleBioCancel}>Cancel</button>
                <button
                  onClick={handleBioUpdate}
                  disabled={disable}
                  ref={saveBtn}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="personal-detalis">
        <ul>
          <li>
            <FaExclamationCircle fill="rgb(118, 116, 116)"></FaExclamationCircle>
            <span>
              <strong>Profile </strong> - {cateData}
            </span>
          </li>
          {user.work &&
            user.work.map((data, index) => (
              <li key={index}>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeFdxxekDD4k3-gh1zRhBqBbQE0O-ZdJm-NATQ75l0mb432QVWtA_NX5vMVE4upu14rMSfNKekN3UGYKYxp_YkH9"
                  alt=""
                />
                <span>
                  {data.position} at <strong> {data.company}</strong>
                </span>
              </li>
            ))}
          {user.edu &&
            user.edu.map((data, index) => (
              <li key={index}>
                <img
                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png?_nc_eui2=AeEDCgf5eblvg5b-aPUWfW4bC7xezJFSLOkLvF7MkVIs6WfenWGYoZ7wCkwsfrw2TJDkR_IU-qIU_oateKIx-WS0"
                  alt=""
                />
                <span>
                  Studied at <strong>{data}</strong>
                </span>
              </li>
            ))}

          {user.living && (
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeGKf-i1529iuIZrywwP1JxzysO07LK9kRPKw7Tssr2RE3lRKgVBV082fhw1ePPspUTyDDN-F1KefWJm5Sn8VuR0"
                alt=""
              />
              <span>
                Lives in <strong> {user.living}</strong>
              </span>
            </li>
          )}
          {user.home_town && (
            <li>
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeGKf-i1529iuIZrywwP1JxzysO07LK9kRPKw7Tssr2RE3lRKgVBV082fhw1ePPspUTyDDN-F1KefWJm5Sn8VuR0"
                alt=""
              />
              <span>
                Home Town at <strong> {user.home_town}</strong>
              </span>
            </li>
          )}
          <li>
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/mp_faH0qhrY.png?_nc_eui2=AeHYM0HHWr5rVV8bx5vo2QfhnFrlaiZVSWecWuVqJlVJZ_TA5dgza2xrZsMSBb6cDj6gYnHD2H8aOCZBXtrohyzN"
              alt=""
            />
            <span>Joined {getJoinedDate(user.createdAt)}</span>
          </li>
        </ul>
        {/* Modal */}
        {details && (
          <FbModal title={"Edit Details"} closmodal={modalHandler}>
            <div className="modal-header">
              <h4 className="modal-title">Customize your intro</h4>
              <span className="modal-subtitle">
                Details you select will be public.
              </span>
            </div>
            <div className="profile-intro">
              <div className="profile-intro-items">
                <span className="intro-title">Category</span>
                {cateData && (
                  <span className="profile-category-item">
                    <span className="profile-caterory-wrapper">
                      <FaExclamationCircle fill="rgb(118, 116, 116)"></FaExclamationCircle>
                      <span>{cateData}</span>
                    </span>
                    <FaPencilAlt
                      className="edit-pen"
                      onClick={handleShow}
                    ></FaPencilAlt>{" "}
                  </span>
                )}
                {!cateData && (
                  <a href="" onClick={handleShow}>
                    <span className="intro-icon">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeE0ySyCiCrpB2XHj-SO7137Xco6tKIYP1Fdyjq0ohg_UcHuNS3l5JjrJxJe2HWv3tLTrccSL3YGW6GOlibTv0ii"
                        alt=""
                      />{" "}
                      Add Category
                    </span>
                  </a>
                )}
                {catShow && (
                  <ClickUpdate
                    hide={setCatShow}
                    save={handleUpdatecate}
                    data={{
                      placeholder: "Set your Profile Category",
                      data: cateData,
                      setData: setCateData,
                    }}
                  ></ClickUpdate>
                )}
              </div>
              <div className="profile-intro-items">
                <span className="intro-title">Work</span>
                {job && (
                  <span className="profile-category-item">
                    <span className="profile-caterory-wrapper">
                      {user.work &&
                        user.work.map((data, index) => (
                          <>
                            <li key={index}>
                              <span>
                                <img
                                  src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeFdxxekDD4k3-gh1zRhBqBbQE0O-ZdJm-NATQ75l0mb432QVWtA_NX5vMVE4upu14rMSfNKekN3UGYKYxp_YkH9"
                                  alt=""
                                />
                                <span>
                                  {data.position} at{" "}
                                  <strong>{data.company}</strong>
                                </span>
                              </span>
                              <FaTrash
                                className="edit-pen"
                                onClick={() => handleJobRemove(data.company)}
                              ></FaTrash>{" "}
                            </li>
                          </>
                        ))}
                    </span>
                  </span>
                )}
                {jobShow && (
                  <ClickUpdate
                    hide={setJobShow}
                    save={handleUpdatejob}
                    data={{
                      placeholder: "Set your Profile Category",
                      data: position,
                      setData: setPosition,
                    }}
                    data2={{
                      placeholder: "Set your Profile Category",
                      data: company,
                      setData: setCompany,
                    }}
                  ></ClickUpdate>
                )}
                {!jobShow && (
                  <a href="" onClick={handleJobShow}>
                    <span className="intro-icon">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeE0ySyCiCrpB2XHj-SO7137Xco6tKIYP1Fdyjq0ohg_UcHuNS3l5JjrJxJe2HWv3tLTrccSL3YGW6GOlibTv0ii"
                        alt=""
                      />
                      Add a workspace
                    </span>
                  </a>
                )}
              </div>

              <div className="profile-intro-items">
                <span className="intro-title">Education</span>
                <span className="profile-caterory-wrapper">
                  {user.edu &&
                    user.edu.map((data, index) => (
                      <>
                        <li key={index}>
                          <span>
                            <img
                              src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png?_nc_eui2=AeEDCgf5eblvg5b-aPUWfW4bC7xezJFSLOkLvF7MkVIs6WfenWGYoZ7wCkwsfrw2TJDkR_IU-qIU_oateKIx-WS0"
                              alt=""
                            />
                            <span>
                              Studied at <strong>{data}</strong>
                            </span>
                          </span>
                          <FaTrash
                            className="edit-pen"
                            onClick={() => handleEduRemove(data)}
                          ></FaTrash>{" "}
                        </li>
                      </>
                    ))}
                </span>
                {eduShow && (
                  <ClickUpdate
                    hide={setEduShow}
                    save={handleEduUpdate}
                    data={{
                      placeholder: "Set your Education History",
                      data: edu,
                      setData: setEdu,
                    }}
                  ></ClickUpdate>
                )}
                {!eduShow && (
                  <a href="" onClick={handleEduShow}>
                    <span className="intro-icon">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeE0ySyCiCrpB2XHj-SO7137Xco6tKIYP1Fdyjq0ohg_UcHuNS3l5JjrJxJe2HWv3tLTrccSL3YGW6GOlibTv0ii"
                        alt=""
                      />{" "}
                      Add Education
                    </span>
                  </a>
                )}
              </div>

              <div className="profile-intro-items">
                <span className="intro-title">Current city</span>
                <span className="profile-caterory-wrapper">
                  {user.living && (
                    <li>
                      <span>
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeGKf-i1529iuIZrywwP1JxzysO07LK9kRPKw7Tssr2RE3lRKgVBV082fhw1ePPspUTyDDN-F1KefWJm5Sn8VuR0"
                          alt=""
                        />
                        <span>
                          Living at <strong>{user.living}</strong>
                        </span>
                      </span>
                      <FaTrash
                        className="edit-pen"
                        onClick={handleLivingRemove}
                      ></FaTrash>{" "}
                    </li>
                  )}
                </span>

                {cityShow && (
                  <ClickUpdate
                    hide={setCityShow}
                    save={handleCityUpdate}
                    data={{
                      placeholder: "Set your Living City",
                      data: city,
                      setData: setCity,
                    }}
                    data2={{
                      placeholder: "Set your Living Country",
                      data: country,
                      setData: setCountry,
                    }}
                  ></ClickUpdate>
                )}
                {!cityShow && (
                  <a href="" onClick={handleCityShow}>
                    <span className="intro-icon">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeE0ySyCiCrpB2XHj-SO7137Xco6tKIYP1Fdyjq0ohg_UcHuNS3l5JjrJxJe2HWv3tLTrccSL3YGW6GOlibTv0ii"
                        alt=""
                      />{" "}
                      Add Current City
                    </span>
                  </a>
                )}
              </div>

              <div className="profile-intro-items">
                <span className="intro-title">Home Town</span>
                <span className="profile-caterory-wrapper">
                  {user.home_town && (
                    <li>
                      <span>
                        <img
                          src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeGKf-i1529iuIZrywwP1JxzysO07LK9kRPKw7Tssr2RE3lRKgVBV082fhw1ePPspUTyDDN-F1KefWJm5Sn8VuR0"
                          alt=""
                        />
                        <span>
                          Home Town at <strong>{user.home_town}</strong>
                        </span>
                      </span>
                      <FaTrash
                        className="edit-pen"
                        onClick={handleHomeRemove}
                      ></FaTrash>{" "}
                    </li>
                  )}
                </span>

                {homeShow && (
                  <ClickUpdate
                    hide={setHomeShow}
                    save={handleTownUpdate}
                    data={{
                      placeholder: "Set your Homw Town",
                      data: town,
                      setData: setHome,
                    }}
                    data2={{
                      placeholder: "Set your Country",
                      data: country,
                      setData: setCountry,
                    }}
                  ></ClickUpdate>
                )}
                {!homeShow && (
                  <a href="" onClick={handleHomeShow}>
                    <span className="intro-icon">
                      <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeE0ySyCiCrpB2XHj-SO7137Xco6tKIYP1Fdyjq0ohg_UcHuNS3l5JjrJxJe2HWv3tLTrccSL3YGW6GOlibTv0ii"
                        alt=""
                      />{" "}
                      Add Current City
                    </span>
                  </a>
                )}
              </div>
            </div>
            <div className="profile-modal-footer">
              <span>Update Your Information</span>
              <div className="profile-footer-btns">
                <button>Cancel</button>
                <button>Save</button>
              </div>
            </div>
          </FbModal>
        )}
        {/* Modal  */}
        <button onClick={modalHandler} href="#">
          Edit Details
        </button>
      </div>
      <div className="personal-detalis hobies-info">
        <ul>
          <li>
            <a href="">
              <img src={wave} alt="" /> <span>Windsurfing</span>
            </a>
          </li>
          <li>
            <a href="">
              <img src={wave} alt="" /> <span>Windsurfing</span>
            </a>
          </li>
          <li>
            <a href="">
              <img src={wave} alt="" /> <span>Windsurfing</span>
            </a>
          </li>
          <li>
            <a href="">
              <img src={wave} alt="" /> <span>Windsurfing</span>
            </a>
          </li>
        </ul>
        <button href="#">Edit Hobies</button>
      </div>

      {/* Features Card */}
      <div className="featured-card-wrapper">
        <div className="feature-items-wrapper">
          {user.featured &&
            user.featured.slice(0, 3).map((item, index) => {
                return  <div className="featured-item-wrapper">
                <div
                  key={index}
                  className="featured-items"
                  onClick={(e) => handleFeaturedSlider(e, item, index)}
                >
                  <div className="item-img-wrapper">
                    <img
                      src={`${item.sliders[0]}`}
                      alt=""
                    />
                    <p className="counter">+3</p>
                  </div>
                  <p>{item.name}</p>
                </div>
              </div>;
            })}
        </div>
        {showHide && (
          <PopupFullWidth hide={setShowHide} sliderIndex={sliderIndex}>
            <div className="popup-story-slider">
              <StorySlider
                data={sliderIndex}
                hidePopup={setShowHide}
              ></StorySlider>
            </div>
          </PopupFullWidth>
        )}
        <button href="#" onClick={() => setFeaturedShow(true)}>
          Add Features
        </button>
        {
          <div className="add feature-modals-wrapp">
            {featuredShow && !uploadFeatureShow && (
              <FbModal
                title={"Edit Featured"}
                uploadFeatured={uploadFeatureShow}
                closmodal={() => setFeaturedShow(false)}
              >


                {/* Featured Modal Content */}

                <div className="add-feature-wrapper">
                  
                  <div className="edit-featured-content-wrap">
                    {
                      user.featured && user.featured.map((items, index)=>{
                        return  <div className="previous-featured-image-wrapper" onClick={(e)=>handleEditFeaturedModal(e, index)}>
                            <div className="featured-edit-image-wrapper">
                                <img src={`${items.sliders[index]}`} alt="" />
                            </div>
                            <div className="featured-edit-content">
                              <div className="main-content-wrap">
                                <p className="collection-name">{items.name}</p>
                                <p>{items.sliders.length} Items</p>
                              </div>
                              <div className="featured-edit-icon">
                                <FaPenFancy fill=""/>
                              </div>
                            </div>
                          </div>
                      
                       
                      })
                      
                    }

                    {
                      user.featured.length === 0 &&  <>
                          <div className="featured-upload-empty-wrap" style={{margin:'auto'}}>
                              <img
                              src="https://i.ibb.co/f2v2yVk/Screenshot-3.png"
                              alt="Screenshot-3"
                              border="0"
                            />
                            <p>
                              Features your favurite photos and stories to show all of
                              your friends!
                            </p>
                          </div>
                      </>
                    }
                  </div>

                  <button onClick={() => setUploadFeatureShow(true)}>
                      Add New
                    </button>
                </div>
                
              </FbModal>
            )}

            {/* Edit Featured Item Show Modal */}

            {
              editFeatured && <FbModal
              title={"Edit Featured Collection"}
              uploadFeatured={editFeatured}
              closmodal={() => setEditFeatured(false)}
              handleBackBtn={handleUploadBack}
            >
              {/* Featured Modal Content */}
              <div className="featured-contentwrapper-upload">
                <div className="editFeaturedUpload-wrapper">
                  <div className="collection-wrap">
                    <div className="colverImg">
                      <img src={`/sliders/${editSelected.sliders[0]}`} alt="" />
                    </div>
                    <div className="collection-title">
                      <input
                        type="text"
                        placeholder="collection Name"
                        value={editSelected.name}
                        onChange={handleCollectionTitle}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="featured-preview">
                    {editSelected.sliders &&
                      editSelected.sliders.map((item, index) => {


                        let urlLink = `/sliders/${item}`

                        return <label htmlFor={`checked-${index}`} key={index}>
                        <div
                          className="featured-preview-item"
                          style={{backgroundImage: `url(${urlLink})`}}
                        >
                         
                          <input
                            type="checkbox"
                            id={`checked-${index}`}
                            checked={editSelected.sliders.includes(item)}
                            onChange={handleEditUpdate}
                            value={item}
                            hidden
                            className="feature-preview-images"
                          />
                          <div className="container checked-icon">
                            <div className="round">
                              {editSelected.sliders.includes(item) && (
                                <FaCheckCircle
                                  className="icon-checked checked-icon"
                                  style={{
                                    fontSize: "18px",
                                    color: "#ffff",
                                  }}
                                />
                              )}
                              {!editSelected.sliders.includes(item) && (
                                <FaRegCircle
                                  className="icon-unchecked checked-icon"
                                  style={{
                                    fontSize: "18px",
                                    color: "#ffff",
                                  }}
                                />
                              )}
                            </div>
                          </div>
  
                         
                        </div>
                      </label>
                      }
                      
                      
                      
                      )}
                  </div>
                </div>
                <div className="featured-upload-btn">
                  <button className="" onClick={handleEditFeaturedUpload}>Upload</button>
                </div>
              </div>
            </FbModal>

            }


            {/* Upload featured item modal */}
            {uploadFeatureShow && (
              <FbModal
                title={"Upload Featured Image"}
                uploadFeatured={uploadFeatureShow}
                closmodal={() => setFeaturedShow(false)}
                handleBackBtn={handleFeaturedBack}
              >
                {/* Featured Modal Content */}
                <div className="featured-contentwrapper-upload">
                  <div className="add-feature-wrapper featured-upload-wrapper">
                    <label
                      htmlFor="uploadFeature"
                      className="upload-file-label"
                    >
                      Upload Photo
                    </label>
                    <input
                      onChange={handlePreview}
                      type="file"
                      name=""
                      id="uploadFeature"
                      multiple={true}
                      hidden
                    />
                    <br />

                    <div className="featured-preview">
                      {postImages &&
                        postImages.map((item, index) => {
                          let imgUrl = URL.createObjectURL(item);

                          return (
                            <label htmlFor={`checked-${index}`} key={index}>
                              <div
                                className="featured-preview-item"
                                style={{ backgroundImage: `url(${imgUrl})` }}
                              >
                                <input
                                  type="checkbox"
                                  id={`checked-${index}`}
                                  checked={selected.includes(item)}
                                  onChange={handleChangeItems}
                                  value={item.name}
                                  hidden
                                  className="feature-preview-images"
                                />
                                <div className="container checked-icon">
                                  <div className="round">
                                    {selected.includes(item) && (
                                      <FaCheckCircle
                                        className="icon-checked checked-icon"
                                        style={{
                                          fontSize: "18px",
                                          color: "#ffff",
                                        }}
                                      />
                                    )}
                                    {!selected.includes(item) && (
                                      <FaRegCircle
                                        className="icon-unchecked checked-icon"
                                        style={{
                                          fontSize: "18px",
                                          color: "#ffff",
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                  <div className="featured-upload-btn">
                    <button onClick={hadleEditUploadPhtos}>Next</button>
                  </div>
                </div>
              </FbModal>
            )}
            {upFeatureColection && (
              <FbModal
                title={"Edit Featured Collection"}
                uploadFeatured={upFeatureColection}
                closmodal={() => setUpFeatureColection(false)}
                handleBackBtn={handleUploadBack}
              >
                {/* Featured Modal Content */}
                <div className="featured-contentwrapper-upload">
                  <div className="editFeaturedUpload-wrapper">
                    <div className="collection-wrap">
                      <div className="colverImg">
                        <img src={URL.createObjectURL(postImages[0])} alt="" />
                      </div>
                      <div className="collection-title">
                        <input
                          type="text"
                          placeholder="collection Name"
                          value={collectionTitle}
                          onChange={handleCollectionTitle}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="featured-preview">
                      {postImages &&
                        postImages.map((item, index) => {
                          let imgUrl = URL.createObjectURL(item);

                          return (
                            <label htmlFor={`checked-${index}`} key={index}>
                              <div
                                className="featured-preview-item"
                                style={{ backgroundImage: `url(${imgUrl})` }}
                              >
                                <input
                                  type="checkbox"
                                  id={`checked-${index}`}
                                  checked={selected.includes(item)}
                                  onChange={handleChangeItems}
                                  value={item.name}
                                  hidden
                                  className="feature-preview-images"
                                />
                                <div className="container checked-icon">
                                  <div className="round">
                                    {selected.includes(item) && (
                                      <FaCheckCircle
                                        className="icon-checked checked-icon"
                                        style={{
                                          fontSize: "18px",
                                          color: "#ffff",
                                        }}
                                      />
                                    )}
                                    {!selected.includes(item) && (
                                      <FaRegCircle
                                        className="icon-unchecked checked-icon"
                                        style={{
                                          fontSize: "18px",
                                          color: "#ffff",
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                  <div className="featured-upload-btn">
                    <button onClick={handleSubmitUpload}>Upload</button>
                  </div>
                </div>
              </FbModal>
            )}
          </div>
        }
      </div>
    </FbCard>
    </>
  );
};

export default ProfileIntro;
