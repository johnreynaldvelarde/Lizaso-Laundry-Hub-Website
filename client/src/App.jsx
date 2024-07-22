import React from 'react'
import './index.css'
import LandingNavbar from './components/Landing_Page/LandingNavbar'
import LandingHero from './components/Landing_Page/LandingHero'

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      <LandingNavbar/>
      <LandingHero/>
    </div>
  )
}

export default App