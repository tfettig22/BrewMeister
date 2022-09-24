import React, { useState, useEffect, useRef } from 'react';
import './SaveRecipe.css';
import { useNavigate, useParams } from 'react-router-dom';
import { postBeer } from '../../api-calls';
import { assignImage } from '../../utility-functions/utility';

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

  assignImage(selectedBeer);

  return (
    <section className='save-a-beer-section'>
      <div className='save-beer-card'>
        <img className='save-beer-image' src={selectedBeer.image} alt='example beer'></img>
        <div className='save-card-info-container'>
          <p className='save-card-name'>{selectedBeer.name}</p>
          <p className='save-card-tagline'>{selectedBeer.tagline}</p>
          <p className='save-card-stats'>{`ABV: ${selectedBeer.abv} IBU: ${selectedBeer.ibu}`}</p>
        </div>
      </div>

      <form className='save-beer-form' onSubmit={(event) => handleSubmit(event)}>
        <label className='save-beer-label' htmlFor='textarea'>Include some notes about how the brewing process went:</label>
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
    </section>
  );
}

export default SaveRecipe;