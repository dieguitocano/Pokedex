import React, { useState } from 'react'
import InputHome from './InputHome'


const HomeScreen = () => {

  

  return (
    <div className='home-container'>
      <div className='intro-box'>
        <div className='intro-container'>
          <h1 className='pokedex-title'>Pokedex</h1>
          <h2 className='hello-trainer'>Hello trainer</h2>
          <InputHome />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen