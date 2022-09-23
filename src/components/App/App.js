import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import BeerCards from '../BeerCards/BeerCards';
import BeerOfTheDay from '../BeerOfTheDay/BeerOfTheDay';
import BeerInfo from '../BeerInfo/BeerInfo';
import SaveRecipe from '../SaveRecipe/SaveRecipe';
import SavedBeers from '../SavedBeers/SavedBeers';
import { getBeerData, getRandomBeer, getSingleBeer } from '../../api-calls';

function App() {
  const [randomBeer, setRandomBeer] = useState([]);
  const [beers, setBeers] = useState([]);
  const [selectedBeer, setSelectedBeer] = useState({});

  const filterBeer = (method, value) => {
    getBeerData(method, value).then(data => {
      setBeers(data);
    })
  }

  const getBeerOfTheDay = () => {
    getRandomBeer().then(data => {
      setRandomBeer(data);
    })
  }

  const getSelectedBeer = (id) => {
    getSingleBeer(id).then(data => {
      setSelectedBeer(data[0]);
    })
  }

  useEffect(() => {
    getBeerOfTheDay();
  }, [])

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path ='/' element={
          <>
            <Filter filterBeer={filterBeer} />
            <BeerOfTheDay randomBeer={randomBeer} getSelectedBeer={getSelectedBeer} />
          </>
        }/>
        <Route path='/beers' element={
          <>
            <Filter filterBeer={filterBeer} />
            <BeerCards beers={beers} getSelectedBeer={getSelectedBeer} />
          </>
        }/>
        <Route path='/beer-details/:id' element={
          <>
            <BeerInfo />
          </>
        }/>
        <Route path='/save-this-beer/:id' element={
          <>
            <SaveRecipe selectedBeer={selectedBeer} getSelectedBeer={getSelectedBeer} />
          </>
        }/>
        <Route path='/saved-beers' element={
          <>
            <SavedBeers />
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
