import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight, FaPlay } from 'react-icons/fa'
import { AiOutlineSound } from "react-icons/ai";
import Avatar from '../Avatar/Avatar'
import './StorySlider.css'
import { featuredItems } from '../../Fackers/featured';
import { useEffect } from 'react';

const StorySlider = ({hidePopup}) => {

  const [indexItem, setIndexItem] = useState(0)


  useEffect(()=>{


    
    let SetTimeOut = setTimeout(() => {

      if (indexItem <= featuredItems.length) {
        setIndexItem(indexItem + 1)
      }
      if (indexItem === (featuredItems.length - 1)) {
        hidePopup(false)
      }
    }, 3000);
    return () => clearTimeout(SetTimeOut)
  },[indexItem])
  // handle slider next
const handleSliderNext = (e) => {
  e.preventDefault()
  setIndexItem(((indexItem + 1)%featuredItems.length))
}
  return (
    <>
    <div className="story-slider-wrapper">
    <div className="top-navigations">
    <div className="slider-bars">
      
      {
        featuredItems.map((item, index)=>

           <div className="bars" key={index} >
            <div className={`progress ${index < (indexItem + 1)? 'viewed' : ''} ` }></div>
          </div>
        )
      }
     
    </div>
    <div className="media-navigator">
      <div className="slider-user-info">
        <Avatar/>
        <h4>Saki Salman</h4>
      </div>
      <div className="slider-media-icons">
        <FaPlay/>
        <AiOutlineSound/>
      </div>
    </div>
    </div>
    <div className="slider-item-wrap" style={{backgroundImage: `url(${featuredItems[indexItem].photo})`}}>
         
    </div>

    {
      indexItem > 0 && <div className=' navigation prev-btn' onClick={()=> setIndexItem((indexItem - 1)%featuredItems.length)}><FaAngleLeft /></div>
    }
    
     <div className=' navigation next-btn' onClick={handleSliderNext}><FaAngleRight/></div>
    
    </div>
    </>
  )
}

export default StorySlider