import React, { useEffect, useRef, useState } from "react";
import FbCard from "../Fb-card/FbCard";
import wave from "../../_assets/icons/wave.png";
import flower from "../../_assets/images/flower.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  FaExclamationCircle,
  FaGlobeAmericas,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import createToast from "../../Utility/toast";
import { profileDataUpdate, profileUpdate } from "../../redux/Auth/action";
import FbModal from "../Modal/FbModal";
import ClickUpdate from "../ClickUpdate/ClickUpdate";
import PopupFullWidth from "../Popups/PopUpFullWidth/PopupFullWidth";
import StorySlider from "../StorySlider/StorySlider";

const ProfileIntro = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [bioShow, setBioShow] = useState(false);
  const [disable, setDisable] = useState(true);
  const [bio, setBio] = useState(user.bio);
  const [remain, setRemain] = useState(101 - bio.length);
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
  const [country, setCountry] = useState('');
  const [cityShow, setCityShow] = useState(false);
  
  const [homeShow, setHomeShow] = useState(false);
  const [home, setHome] = useState(user.home_town ? user.home_town : "");
  const [town, setTown] = useState('');


  const [showHide, setShowHide] =useState(false)
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
      e.preventDefault()
      
      if (!city || !country) {
        return alert('Set Country and City Both!')
      }
      let livingTown = city + ',' +  country
      dispatch(
        profileDataUpdate({ living : livingTown }, user._id, setEduShow)
      );
    
    // handle City remove

  }
  const handleLivingRemove = (e) => {
    e.preventDefault()
    dispatch(
      profileDataUpdate({ living : null }, user._id, setEduShow)
      );
      
    }
    // Show City Area
    const handleHomeShow = (e) => {
      e.preventDefault();
      setHomeShow(!homeShow);
    };
// Update Home towb
const handleTownUpdate = (e) => {
  e.preventDefault()

  let homeTowm = home + "," + country
  dispatch(
    profileDataUpdate({ home_town : homeTowm }, user._id, setEduShow)
  );

}
          // handle Home Town remove

  const handleHomeRemove = (e) => {
    e.preventDefault()
    dispatch(
      profileDataUpdate({ home_town : null }, user._id, setEduShow)
    );

  }
// handle Joined In Facebook Reveal
const getJoinedDate = (createdat) => {
  let data = new Date(user.createdAt)
let options = {
  month : "long"
  
}
let year = data.getFullYear()
let month  = data.toLocaleDateString('en-us', options)

let joined_date = month + ", " + year
return joined_date;
}
return (
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

          {
            user.living &&
            <li>
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeGKf-i1529iuIZrywwP1JxzysO07LK9kRPKw7Tssr2RE3lRKgVBV082fhw1ePPspUTyDDN-F1KefWJm5Sn8VuR0"
              alt=""
            />
            <span>
              Lives in <strong> {user.living }</strong>
            </span>
          </li>
          }
          {
            user.home_town &&
            <li>
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeGKf-i1529iuIZrywwP1JxzysO07LK9kRPKw7Tssr2RE3lRKgVBV082fhw1ePPspUTyDDN-F1KefWJm5Sn8VuR0"
              alt=""
            />
            <span>
              Home Town at <strong> {user.home_town }</strong>
            </span>
          </li>
          }
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

                {
                  user.living && <li >
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
                }

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
                {
                  !cityShow && <a href="" onClick={handleCityShow}>
                  <span className="intro-icon">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeE0ySyCiCrpB2XHj-SO7137Xco6tKIYP1Fdyjq0ohg_UcHuNS3l5JjrJxJe2HWv3tLTrccSL3YGW6GOlibTv0ii"
                      alt=""
                    />{" "}
                    Add Current City
                  </span>
                </a>
                }
              </div>

              <div className="profile-intro-items">
                <span className="intro-title">Home Town</span>
                <span className="profile-caterory-wrapper">

                {
                  user.home_town && <li >
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
                }

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
                {
                  !homeShow&& <a href="" onClick={handleHomeShow}>
                  <span className="intro-icon">
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/OcOuC5vm3rq.png?_nc_eui2=AeE0ySyCiCrpB2XHj-SO7137Xco6tKIYP1Fdyjq0ohg_UcHuNS3l5JjrJxJe2HWv3tLTrccSL3YGW6GOlibTv0ii"
                      alt=""
                    />{" "}
                    Add Current City
                  </span>
                </a>
                }
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
          <div className="featured-item-wrapper">
            <div className="featured-items" onClick={() => setShowHide(!showHide)}>
              <div className="item-img-wrapper">
                <img src={flower} alt="" />
                <p className="counter">+3</p>
              </div>
              <p>Collection</p>
            </div>
          </div>
        </div>
        <button href="#">Add Features</button>

        {showHide && <PopupFullWidth hide={setShowHide}>

               <div className="popup-story-slider">
               <StorySlider hidePopup={setShowHide}></StorySlider>
               </div>
          
          </PopupFullWidth>}

      </div>
    </FbCard>
  );
};

export default ProfileIntro;
