import React from 'react'
import { FaGlobeAmericas } from 'react-icons/fa'
import './ClickUpdate.css'

const ClickUpdate = ({data, data2, hide, save}) => {
  return (
    <>
      <div className="click-update">
      {
        data &&   <textarea placeholder={data.placeholder} onChange={(e)=> (data.setData(e.target.value))}>{data.data}</textarea>
      }
       {
         data2 && <textarea placeholder={data2.placeholder} onChange={(e)=> (data2.setData(e.target.value))}>{data2.data}</textarea>
       }
            <div className="click_update_btn">
          <div className="bio_btn">
            <button onClick={(e) => hide(false)}>Cancel</button>
            <button className='blue' onClick={save}>Save</button>
          </div>
        </div>
       </div>
    </>
  )
}

export default ClickUpdate
