import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/')
  }

  const goToSavedBeers = () => {
    navigate('/saved-beers')
  }

  return (
    <div className='header'>
      <button className='home-button' onClick={() => goHome()}>Home</button>
      <h1 className='brewmeister'>BrewMeister</h1>
      <button className='saved-beers-button' onClick={() => goToSavedBeers()}>Saved Beers</button>
    </div>
  )
}

export default Header;