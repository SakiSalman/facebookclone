import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import CreatePost from "../../components/CreatePost/CreatePost";
import FbCard from "../../components/Fb-card/FbCard";
import Header from "../../components/Header/Header";
import ProfileHeader from "../../components/Header/ProfileHeader";
import UserPost from "../../components/UserPost/UserPost";
import wave from "../../_assets/icons/wave.png";
import flower from "../../_assets/images/flower.jpg";
const Profile = () => {
  return (
    <div>
      <Header />
      <ProfileHeader />
      {/* Prfile Body */}

      <div class="fb-profile-body">
        <div className="user-profile-info-wrappper">
          <div className="profile-personal-info">
            <FbCard>
              <h3>Intro</h3>
              <div className="bio">
                <p>Honesty is my Success �</p>
                <button href="#">Edit Bio</button>
              </div>
              <div className="personal-detalis">
                <ul>
                  <li>
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/Q9Qu4uLgzdm.png?_nc_eui2=AeFdxxekDD4k3-gh1zRhBqBbQE0O-ZdJm-NATQ75l0mb432QVWtA_NX5vMVE4upu14rMSfNKekN3UGYKYxp_YkH9"
                      alt=""
                    />
                    <span>
                      Founder & Chief Developer at <strong>Shadhin Web</strong>
                    </span>
                  </li>
                  <li>
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png?_nc_eui2=AeEDCgf5eblvg5b-aPUWfW4bC7xezJFSLOkLvF7MkVIs6WfenWGYoZ7wCkwsfrw2TJDkR_IU-qIU_oateKIx-WS0"
                      alt=""
                    />
                    <span>
                      Studied at{" "}
                      <strong>
                        Govt. Institute of health technology.sylhet
                      </strong>
                    </span>
                  </li>
                  <li>
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png?_nc_eui2=AeGKf-i1529iuIZrywwP1JxzysO07LK9kRPKw7Tssr2RE3lRKgVBV082fhw1ePPspUTyDDN-F1KefWJm5Sn8VuR0"
                      alt=""
                    />
                    <span>
                      Lives in <strong>Dhaka, Bangladesh</strong>
                    </span>
                  </li>
                  <li>
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/mp_faH0qhrY.png?_nc_eui2=AeHYM0HHWr5rVV8bx5vo2QfhnFrlaiZVSWecWuVqJlVJZ_TA5dgza2xrZsMSBb6cDj6gYnHD2H8aOCZBXtrohyzN"
                      alt=""
                    />
                    <span>Joined October 2017</span>
                  </li>
                </ul>
                <button href="#">Edit Details</button>
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
                <div className="featured-item-wrapper">
                  <div className="featured-items">
                    <div className="item-img-wrapper">
                      <img src={flower} alt="" />
                      <p className="counter">+3</p>
                    </div>
                    <p>Collection</p>
                  </div>
                </div>
                <div className="featured-item-wrapper">
                  <div className="featured-items">
                    <div className="item-img-wrapper">
                      <img src={flower} alt="" />
                      <p className="counter">+3</p>
                    </div>
                    <p>Collection</p>
                  </div>
                </div>
                <div className="featured-item-wrapper">
                  <div className="featured-items">
                    <div className="item-img-wrapper">
                      <img src={flower} alt="" />
                      <p className="counter">+3</p>
                    </div>
                    <p>Collection</p>
                  </div>
                </div>
              </div>
            </FbCard>
          </div>
          <div className="user-profile-posts">
            <CreatePost />
            <UserPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
