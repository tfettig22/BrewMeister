import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
import './App.css';
// import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import BeerCards from '../BeerCards/BeerCards';
import { getBeerData } from '../../api-calls';

function App() {
  const [beers, setBeers] = useState([])

  const filterBeer = (method, value) => {
    getBeerData(method, value).then(data => {
      setBeers(data)
    })
  }

  return (
    <div className="App">
      <h1>BrewMeister</h1>
      <Filter filterBeer={filterBeer}/>
      <BeerCards beers={beers} />
    </div>
  );
}

export default App;
