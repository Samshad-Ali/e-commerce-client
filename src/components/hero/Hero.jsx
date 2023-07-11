import React from 'react'
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='hero'>
      <div className="hero-content flex-center">
        <h1 className="heading">Exclusive Print and Artwork</h1>
        <p className="sub-heading">Exclusive art of Pieces, for the Exclusive You.</p>
        <button className='primary-btn cta' onClick={()=>{navigate('/category')}}>Explore more</button>
      </div>
    </div>
  )
}

export default Hero