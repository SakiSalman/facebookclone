import React, { useState } from 'react'
import Footer from '../../components/Footer'
import RegisterModal from '../../components/RegisterModal'

const RegPage = () => {
    const [modal, setModal] = useState(false)
  return (
    <div>
      <RegisterModal setModal={setModal}/>
    </div>
  )
}

export default RegPage
