import React from 'react';
import './BeerCards.css';
import { useNavigate } from 'react-router-dom';
import { assignImage } from '../../utility-functions/utility';

const BeerCards = ({ beers, getSelectedBeer }) => {
  const navigate = useNavigate();

  const selectABeer = (beer) => {
    navigate(`/beer-details/${beer.id}`);
    getSelectedBeer(beer.id);
  }

  let beerCards;
  if (beers.length > 0) {
    beerCards = beers.map(beer => {
      assignImage(beer)
      return (
        <div className='beer-card' key={beer.id}>
          <p>{beer.name}</p>
          <p>{beer.tagline}</p>
          <p>{`ABV: ${beer.abv} IBU: ${beer.ibu}`}</p>
          <img className='image' src={beer.image} alt='example beer'></img>
          <button onClick={() => selectABeer(beer)}>Brew Me!</button>
        </div>
      );
    });
  }

  return (
    <div className='beer-cards-container'>{beerCards}</div>
  );
}

export default BeerCards;