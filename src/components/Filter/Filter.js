import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Filter.css';
import { useNavigate } from 'react-router-dom';

const Filter = ({ filterBeer }) => {
  const [filterType, setFilterType] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    filterBeer(filterType, filterInput);
    setFilterType('');
    setFilterInput('');
    setPlaceholder('');
    navigate('/beers');
  }

  useEffect(() => {
    if (filterType === 'beer_name') {
      setPlaceholder('e.g. Stout');
    } else if (filterType.includes('abv')) {
      setPlaceholder('e.g. 7.5');
    } else if (filterType.includes('ibu')) {
      setPlaceholder('e.g. 50');
    }
  }, [filterType]);

  return (
    <form className='filter-form' id='filter-form' onSubmit={(event) => handleSubmit(event)}>
      <div className='label-container'>
        <label className='label' htmlFor='filter-type'>Filter type</label>
        <label className='label' htmlFor='filter-input'>What kind of beer are you looking for?</label>
      </div>
      <div className='select-and-input'>
        <select className='filter-type' id='filter-type' value={filterType} onChange={(event) => setFilterType(event.target.value)}>
          <option value='none' hidden>Select an option</option>
          <option value='beer_name'>Name/Keyword</option>
          <option value='abv_gt'>ABV greater than:</option>
          <option value='abv_lt'>ABV less than:</option>
          <option value='ibu_gt'>IBU greater than:</option>
          <option value='ibu_lt'>IBU less than:</option>
        </select>


        <input
          className='filter-input'
          id='filter-input'
          type='text'
          name='filterInput'
          placeholder={placeholder || ''}
          value={filterInput}
          onChange={(event) => setFilterInput(event.target.value)}
        />

        <div className='submit-button-container'>
          <button className='submit-filter' type='submit' hidden={!filterType || !filterInput}>Filter</button>
        </div>
      </div>
    </form>
  );
}

export default Filter;

Filter.propTypes = {
  filterBeer: PropTypes.func
}