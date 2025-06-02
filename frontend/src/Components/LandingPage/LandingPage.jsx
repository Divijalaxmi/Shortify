import React from 'react'
import './LandingPage.css'
import { useNavigate } from 'react-router-dom'


const LandingPage = () => {
    const navigate = new useNavigate();

    const change = ()=>{
        navigate('/UrlForm');
    }

  return (
    <div onClick={change} className='landing-page'>
      
    </div>
  )
}

export default LandingPage
