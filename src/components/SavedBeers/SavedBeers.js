import React, { useState, useEffect } from 'react';
import './SavedBeers.css';
import { getSavedBeers } from '../../api-calls';
import { useNavigate } from 'react-router-dom';

const SavedBeers = () => {
  const [savedBeers, setSavedBeers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSavedBeers().then(data => {
      setSavedBeers(data.beers);
    })
  }, [])

  const selectABeer = (beer) => {
    navigate(`/beer-details/${beer.beerID}`);
  }

  let beerCards;
  if (savedBeers.length > 0) {
    beerCards = savedBeers.map(beer => {
      return (
        <div className='beer-card' key={beer.id}>
          <p>{beer.name}</p>
          <p>{beer.tagline}</p>
          <p>{`ABV: ${beer.abv} IBU: ${beer.ibu}`}</p>
          <p>{beer.notes}</p>
          <button onClick={() => selectABeer(beer)}>Brew Me Again!</button>
        </div>
      );
    });
  } else {
    beerCards = 'You dont have any saved beers yet, find a recipe that sounds good and give it a shot!'
  }

  return (
    <section>
      {beerCards}
    </section>
  )
}

export default SavedBeers;