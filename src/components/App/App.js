import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import BeerCards from '../BeerCards/BeerCards';
import BeerOfTheDay from '../BeerOfTheDay/BeerOfTheDay';
import { getBeerData, getRandomBeer } from '../../api-calls';

function App() {
  const [randomBeer, setRandomBeer] = useState([])
  const [beers, setBeers] = useState([])

  const filterBeer = (method, value) => {
    getBeerData(method, value).then(data => {
      setBeers(data)
    })
  }

  const getBeerOfTheDay = () => {
    getRandomBeer().then(data => {
      setRandomBeer(data)
    })
  }

  useEffect(() => {
    getBeerOfTheDay()
  }, [])

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path ='/' element={
          <>
            <Filter filterBeer={filterBeer}/>
            <BeerOfTheDay randomBeer={randomBeer} />
          </>
        }/>
        <Route path='/filtered-beers' element={
          <>
            <Filter filterBeer={filterBeer}/>
            <BeerCards beers={beers} />
          </>
        }/>
        <Route path='/beer-details' element={
          <>
            <h2>Beer Details page</h2>
          </>
        }/>
        <Route path='/saved-beers' element={
          <>
            <h3>Saved Beers page</h3>
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
