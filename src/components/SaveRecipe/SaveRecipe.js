import React, { useState, useEffect, useRef } from 'react';
import './SaveRecipe.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postBeer } from '../../api-calls';

const SaveRecipe = ({ selectedBeer, getSelectedBeer }) => {
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const appStateReset = useRef(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    postBeer({
      beerID: selectedBeer.id,
      name: selectedBeer.name,
      tagline: selectedBeer.tagline,
      abv: selectedBeer.abv,
      ibu: selectedBeer.ibu,
      notes: notes
    })
    navigate('/saved-beers');
  }

  useEffect(() => {
    if(!appStateReset.current) {
      getSelectedBeer(id);
      appStateReset.current = true;
    }
  }, [getSelectedBeer, id]);

  return (
    <div>
      <p>{selectedBeer.name}</p>
      <p>{selectedBeer.tagline}</p>
      <p>{`ABV: ${selectedBeer.abv} IBU: ${selectedBeer.ibu}`}</p>

      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor='textarea'>Would you like to include some notes about how the brewing process went?</label>
        <textarea
          className='brewing-notes'
          id='textarea'
          name='notes'
          placeholder='Notes...'
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />

        <button type='submit' className='submit-button' disabled={!notes}>Submit</button>
      </form>
    </div>
  );
}

export default SaveRecipe;