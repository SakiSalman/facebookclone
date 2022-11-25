import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Verifycard from '../../components/Login/Verify/Verifycard'

const Verify = () => {
  return (
    <>  
        {/* Heafer */}
        <Header/>

        {/* Verify Box */}
        <Verifycard/>
        {/* Footer */}
        <Footer/>
    </>
  )
}

export default Verify