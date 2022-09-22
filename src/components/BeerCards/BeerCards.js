import React from 'react';
import './BeerCards.css';
import { useNavigate } from 'react-router-dom';

const BeerCards = ({ beers }) => {
  const navigate = useNavigate();

  let beerCards;
  if (beers.length > 0) {
    beerCards = beers.map(beer => {
      return (
        <div className='beer-card' key={beer.id}>
          <p>{beer.name}</p>
          <p>{beer.tagline}</p>
          <p>{`ABV: ${beer.abv} IBU: ${beer.ibu}`}</p>
          <button onClick={() => navigate(`/beer-details/${beer.id}`)}>Brew Me!</button>
        </div>
      )
    })
  }

  return (
    <div className='beer-cards-container'>{beerCards}</div>
  )
}

export default BeerCards;