import React, { useState, useEffect } from 'react';
import './BeerInfo.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleBeer } from '../../api-calls';

const BeerInfo = () => {
  const [selectedBeer, setSelectedBeer] = useState({});
  const [hops, setHops] = useState([]);
  const [malts, setMalts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let hopCounter = 1;
    let maltCounter = 100;
    getSingleBeer(id)
      .then(data => {
        setSelectedBeer(data[0]);
        setHops(data[0].ingredients.hops.map(hop => {
          hopCounter++
          return (
            <div key={`${hopCounter}`}>
              <p>{`${hop.name} - ${hop.amount.value} ${hop.amount.unit}`}</p>
              <p>{`When to add: ${hop.add}`}</p>
            </div>
          );
        }));
        setMalts(data[0].ingredients.malt.map(malt => {
          maltCounter++
          return (
            <div key={`${maltCounter}`}>
              <p>{`${malt.name} - ${malt.amount.value} ${malt.amount.unit}`}</p>
            </div>
          );
        }));
      });
  }, [id]);

    return (
      <section>
        <p>{selectedBeer.name}</p>
        <p>{selectedBeer.tagline}</p>
        {selectedBeer.food_pairing && <p>{selectedBeer.food_pairing.join(', ')}</p>}
        <div>
          <p>Ingredients:</p>
          {selectedBeer.ingredients && <p>{selectedBeer.ingredients.yeast}</p>}
          <p>Malts:</p>
          {malts}
          <p>Hops:</p>
          {hops}
        </div>
        <p>{selectedBeer.description}</p>
        <p>{selectedBeer.brewers_tips}</p>
        <button onClick={() => navigate(`/save-this-beer/${selectedBeer.id}`)}>Save this recipe</button>
      </section>
    );
}

export default BeerInfo;