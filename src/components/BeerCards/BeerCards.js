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
          <img className='card-image' src={beer.image} alt='example beer'></img>
          <div className='card-info-container'>
            <p className='card-name'>{beer.name}</p>
            <p className='card-tagline'>{beer.tagline}</p>
            <p className='card-stats'>{`ABV: ${beer.abv} IBU: ${beer.ibu}`}</p>
          </div>
          <button className='card-button' onClick={() => selectABeer(beer)}>Brew Me!</button>
        </div>
      );
    });
    return (
      <div className='beer-cards-container'>{beerCards}</div>
    );
  } else {
    return (
      <p className='no-search-criteria'>No search criteria has been entered, please use the search bar to find some beers!</p>
    )
  }
}


export default BeerCards;