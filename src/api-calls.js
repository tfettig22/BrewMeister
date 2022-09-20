const getBeerData = (method, value) => {
  return fetch(`https://api.punkapi.com/v2/beers?per_page=80&${method}=${value}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Sorry, looks like we cant find any beer matching your search criteria');
      }
      return response.json();
    });
}

export { getBeerData };