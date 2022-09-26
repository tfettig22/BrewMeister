import React, { useState, useEffect } from 'react';
import './SavedBeers.css';
import { getSavedBeers } from '../../api-calls';
import { useNavigate } from 'react-router-dom';
import { assignImage } from '../../utility-functions/utility';

const SavedBeers = () => {
  const [savedBeers, setSavedBeers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSavedBeers().then(data => {
      setSavedBeers(data.beers);
    })
    .catch(() => setSavedBeers([]))
  }, [])

  const selectABeer = (beer) => {
    navigate(`/beer-details/${beer.beerID}`);
  }

  let beerCards;
  if (savedBeers.length > 0) {
    beerCards = savedBeers.map(beer => {
      beer.description = 'placeholder';
      assignImage(beer);
      return (
        <div className='saved-beer-card' key={beer.id}>
          <p className='saved-beer-name'>{beer.name}</p>
          <p className='saved-beer-tagline'>{beer.tagline}</p>
          <p className='saved-beer-stats'>{`ABV: ${beer.abv} IBU: ${beer.ibu}`}</p>
          <p className='saved-beer-notes'>Notes: {beer.notes}</p>
          <img className='saved-beer-image' src={beer.image} alt='example beer'></img>
          <button className='brew-again-button' onClick={() => selectABeer(beer)}>Brew Me Again!</button>
        </div>
      );
    });
  } else {
    beerCards = <p className='no-saved-beers'>You dont have any saved beers yet, find a recipe that sounds good and give it a shot!</p>
  }

  return (
    <section className='saved-beers-section'>
      {beerCards}
    </section>
  )
}

export default SavedBeers;