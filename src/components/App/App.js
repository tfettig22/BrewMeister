import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';
import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import BeerCards from '../BeerCards/BeerCards';
import BeerOfTheDay from '../BeerOfTheDay/BeerOfTheDay';
import BeerInfo from '../BeerInfo/BeerInfo';
import SaveRecipe from '../SaveRecipe/SaveRecipe';
import SavedBeers from '../SavedBeers/SavedBeers';
import ErrorPage from  '../ErrorPage/ErrorPage';
import { getBeerData, getRandomBeer, getSingleBeer } from '../../api-calls';

function App() {
  const [randomBeer, setRandomBeer] = useState({});
  const [beers, setBeers] = useState([]);
  const [selectedBeer, setSelectedBeer] = useState({});
  const navigate = useNavigate();

  const filterBeer = (method, value) => {
    getBeerData(method, value).then(data => {
      setBeers(data);
    })
    .catch(() => navigate('/error'))
  }

  const getBeerOfTheDay = () => {
    getRandomBeer().then(data => {
      setRandomBeer(data[0]);
    })
    .catch(() => navigate('/error'))
  }

  const getSelectedBeer = (id) => {
    getSingleBeer(id).then(data => {
      setSelectedBeer(data[0]);
    })
    .catch(() => navigate('/error'))
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
          <BeerInfo />
        }/>
        <Route path='/save-this-beer/:id' element={
          <SaveRecipe selectedBeer={selectedBeer} getSelectedBeer={getSelectedBeer} />
        }/>
        <Route path='/saved-beers' element={
          <SavedBeers />
        }/>
        <Route path='*' element={
          <ErrorPage />
        }/>
      </Routes>
    </div>
  );
}

export default App;
