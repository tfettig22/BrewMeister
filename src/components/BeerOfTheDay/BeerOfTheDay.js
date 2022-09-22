import React from 'react';
import './BeerOfTheDay.css';

const BeerOfTheDay = ({ randomBeer }) => {
  if (randomBeer.length > 0) {
    let beer = randomBeer[0]
    return (
      <div>
      <p>{beer.name}</p>
      <p>{beer.tagline}</p>
      <p>{`ABV: ${beer.abv} IBU: ${beer.ibu}`}</p>
      <button>Brew Me!</button>
    </div>
    )
  }
}

export default BeerOfTheDay;