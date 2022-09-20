import React from 'react';
import './BeerCards.css';

const BeerCards = ({ beers }) => {
  let beerCards;
  if (beers.length > 0) {
    beerCards = beers.map(beer => {
      return (
        <div>
          <p>{beer.name}</p>
          <p>{beer.tagline}</p>
          <p>{`ABV: ${beer.abv} IBU: ${beer.ibu}`}</p>
          <button>Brew Me!</button>
        </div>
      )
    })
  }

  return (
    <div>{beerCards}</div>
  )
}

export default BeerCards;