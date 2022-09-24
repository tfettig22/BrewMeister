import React, { useState, useEffect } from 'react';
import './BeerInfo.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleBeer } from '../../api-calls';

const BeerInfo = () => {
  const [selectedBeer, setSelectedBeer] = useState({});
  const [hops, setHops] = useState([]);
  const [malts, setMalts] = useState([]);
  const [pairings, setPairings] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let hopCounter = 1;
    let maltCounter = 100;
    let pairingCounter = 200;
    getSingleBeer(id)
      .then(data => {
        setSelectedBeer(data[0]);
        setHops(data[0].ingredients.hops.map(hop => {
          hopCounter++
          return (
            <div className='hops' key={`${hopCounter}`}>
              <p>{`${hop.name}`}</p>
              <p>{`${hop.amount.value} ${hop.amount.unit}`}</p>
              <p>{`When to add: ${hop.add}`}</p>
            </div>
          );
        }));
        setMalts(data[0].ingredients.malt.map(malt => {
          maltCounter++
          return (
            <div className='malts' key={`${maltCounter}`}>
              <p>{`${malt.name}`}</p>
              <p>{`${malt.amount.value} ${malt.amount.unit}`}</p>
            </div>
          );
        }));
        setPairings(data[0].food_pairing.map(pairing => {
          pairingCounter++
          return (
            <p className='food-pairing' key={`${pairingCounter}`}>{`${pairing}`}</p>
          );
        }));
      });
  }, [id]);

    return (
      <section className='beer-info-section'>
        <div className='top-container'>
          <div className='name-and-tagline'>
            <p className='info-name'>{selectedBeer.name}</p>
            <p className='info-tagline'>{selectedBeer.tagline}</p>
          </div>
          <div className='pairing-container'>
            <p className='pairing-prompt'>Suggested food pairings:</p>
            <div className='food-pairing'>{pairings}</div>
          </div>
          <button className='save-beer-button' onClick={() => navigate(`/save-this-beer/${selectedBeer.id}`)}>Add to Favorites</button>
        </div>
        <div className='bottom-container'>
          <div className='ingredients-container'>
            <p className='ingredients-prompt'>Ingredients:</p>
            {selectedBeer.ingredients && <p className='yeast-prompt'>Yeast:</p>}
            {selectedBeer.ingredients && <p className='yeast'>{selectedBeer.ingredients.yeast}</p>}
            <div className='malts-and-hops'>
              <p className='malts-prompt'>Malts:</p>
              <div className='malts-container'>{malts}</div>
              <p className='hops-prompt'>Hops:</p>
              <div className='hops-container'>{hops}</div>
            </div>
          </div>
          <div className='description-and-tips-container'>
            <p className='info-description'>{selectedBeer.description}</p>
            <p className='info-brewers-tips'>{selectedBeer.brewers_tips}</p>
          </div>
        </div>
      </section>
    );
}

export default BeerInfo;