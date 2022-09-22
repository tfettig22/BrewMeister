import React from 'react';
import './BeerOfTheDay.css';
import { useNavigate } from 'react-router-dom';

const BeerOfTheDay = ({ randomBeer, getSelectedBeer }) => {
  const navigate = useNavigate();

  const selectABeer = (beer) => {
    navigate(`/beer-details/${beer.id}`);
    getSelectedBeer(beer.id);
  }

  if (randomBeer.length > 0) {
    let beer = randomBeer[0];
    return (
      <div className='beer-of-the-day'>
        <p>{beer.name}</p>
        <p>{beer.tagline}</p>
        <p>{`ABV: ${beer.abv} IBU: ${beer.ibu}`}</p>
        <button onClick={() => selectABeer(beer)}>Brew Me!</button>
      </div>
    );
  }
}

export default BeerOfTheDay;