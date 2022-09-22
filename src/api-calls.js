const getBeerData = (method, value) => {
  return fetch(`https://api.punkapi.com/v2/beers?per_page=80&${method}=${value}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Sorry, looks like we cant find any beer matching your search criteria');
      }
      return response.json();
    });
}

const getRandomBeer = () => {
  return fetch('https://api.punkapi.com/v2/beers/random')
    .then(response => {
      if (!response.ok) {
        throw new Error('Sorry, there was an error retrieving the beer data');
      }
      return response.json();
    });
}

const getSingleBeer = (id) => {
  return fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Sorry, we could not find that beer');
      }
      return response.json();
    });
}

export { getBeerData, getRandomBeer, getSingleBeer };