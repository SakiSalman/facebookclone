import React from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import Header from "../../components/Header/Header";
import HomeSidebar from "../../components/Sidebars/HomeSidebar";
import StoryBox from "../../components/StoryBox/StoryBox";
import UserPost from "../../components/UserPost/UserPost";

const Home = () => {

  return (

    <>
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
  </>
  );
};

export default Home;
