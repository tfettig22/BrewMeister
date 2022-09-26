import React from 'react';
import './BeerOfTheDay.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { assignImage } from '../../utility-functions/utility';

const BeerOfTheDay = ({ randomBeer, getSelectedBeer }) => {
  const navigate = useNavigate();

  const selectABeer = (beer) => {
    navigate(`/beer-details/${beer.id}`);
    getSelectedBeer(beer.id);
  }

  assignImage(randomBeer)

  if (randomBeer.name) {
    return (
      <section className='botd-section'>
        <h2 className='botd-header'>Beer of the day:</h2>
        <div className='botd-container'>
          <img className='botd-image' src={randomBeer.image} alt='beer of the day'></img>
          <div className='botd-info'>
            <p className='botd-name'>{randomBeer.name}</p>
            <p className='botd-tagline'>{randomBeer.tagline}</p>
            <p className='botd-description'>{randomBeer.description}</p>
            <p className='botd-stats'>{`ABV: ${randomBeer.abv} IBU: ${randomBeer.ibu}`}</p>
            <button className='botd-button' onClick={() => selectABeer(randomBeer)}>Brew Me!</button>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className='botd-section'></section>
    )
  }
}

export default BeerOfTheDay;

BeerOfTheDay.propTypes = {
  randomBeer: PropTypes.object,
  getSelectedBeer: PropTypes.func
}