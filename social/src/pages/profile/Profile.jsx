import React from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import Header from "../../components/Header/Header";
import ProfileHeader from "../../components/Header/ProfileHeader";
import ProfileFriends from "../../components/Profile/ProfileFriends";
import ProfileGallery from "../../components/Profile/ProfileGallery";
import ProfileIntro from "../../components/Profile/ProfileIntro";
import UserPost from "../../components/UserPost/UserPost";
const Profile = () => {
  return (
    <div>
      <Header />
      <ProfileHeader />
      {/* Prfile Body */}

      <div class="fb-profile-body">
        <div className="user-profile-info-wrappper">
          <div className="profile-personal-info">

            {/* Profile Intero */}
            <ProfileIntro/>
            {/* Profile Intro End */}

            {/* profile photos */}
            <ProfileGallery/>
            {/* Profile Photoes end*/}

            {/* Profile Friends */}
            <ProfileFriends/>
            {/* Profile Friends end */}

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
