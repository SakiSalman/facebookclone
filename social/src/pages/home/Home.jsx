import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CreatePost from "../../components/CreatePost/CreatePost";
import Header from "../../components/Header/Header";
import HomeSidebar from "../../components/Sidebars/HomeSidebar";
import StoryBox from "../../components/StoryBox/StoryBox";
import UserPost from "../../components/UserPost/UserPost";
import Auth from "../auth/Auth";

const Home = () => {

  const {loginState} = useSelector(state => state.auth)
  return (


 <>
 
 {loginState ? <>
    
    <Header/>
  {/* FB HOME BODY  */}
  <div className="fb-home-body">
    <HomeSidebar/>
    <div className="fb-home-timeline-area">
      <div className="fb-home-timeline">
        {/* Story Box  */}
        <StoryBox/>
        {/* Create Post Box  */}
        <CreatePost/>
        {/* User Post  */}
        <UserPost/>
      </div>
    </div>
  </div>
  </> : <Auth/> }
 </>

  );
};

export default Home;
