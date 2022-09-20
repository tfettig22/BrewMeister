import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ filterBeer }) => {
  const [filterType, setFilterType] = useState('');
  const [filterInput, setFilterInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    filterBeer(filterType, filterInput);
    setFilterType('');
    setFilterInput('');
  }

  return (
    <form className='filter-form' onSubmit={(event) => handleSubmit(event)}>
      <select className='filter-type' value={filterType} onChange={(event) => setFilterType(event.target.value)}>
        <option value='none' hidden>Select an option</option>
        <option value='beer_name'>Name/Keyword</option>
        <option value='abv_gt'>ABV greater than:</option>
        <option value='abv_lt'>ABV less than:</option>
        <option value='ibu_gt'>IBU greater than:</option>
        <option value='ibu_lt'>IBU less than:</option>
      </select>

      <input
        className='filter-input'
        type='text'
        name='filterInput'
        placeholder='Name/Keyword - or - Number of ABV/IBU'
        value={filterInput}
        onChange={(event) => setFilterInput(event.target.value)}
      />

      <button className='submit-filter' type='submit'>Filter</button>
    </form>
  )
}

export default Filter;