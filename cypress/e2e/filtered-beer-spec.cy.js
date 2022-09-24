const filteredStub = JSON.stringify(
  [
    {
    id: 24,
    name: "The End Of History",
    tagline: "The World's Strongest Beer.",
    description: "The End of History: The name derives from the famous work of philosopher Francis Fukuyama, this is to beer what democracy is to history. Complexity defined. Floral, grapefruit, caramel and cloves are intensified by boozy heat.",
    abv: 55,
    ibu: null,
    },
    {
    id: 97,
    name: "Bowman's Beard - B-Sides",
    tagline: "English Barley Wine.",
    description: "Ice-distilled double barley wine brewed by Chris from Stone Brewing Co. (see Sunmaid Stout) and BrewDog's own brewers. As robust, resinous and badass as its eponymic beard.",
    abv: 18.3,
    ibu: 50,
    },
    {
    id: 137,
    name: "Sink The Bismarck!",
    tagline: "IPA For The Dedicated.",
    description: "This is IPA amplified, the most evocative style of the craft beer resistance with the volume cranked off the scale. Kettle hopped, dry hopped then freeze hopped for a deep fruit, resinous and spicy aroma. A full on attack on your taste buds ensues as the incredibly smooth liquid delivers a crescendo of malt, sweet honey, hop oils and a torpedo of hop bitterness that lasts and lasts.",
    abv: 41,
    ibu: 1085
    },
    {
    id: 185,
    name: "Tactical Nuclear Penguin",
    tagline: "Uber Imperial Stout.",
    description: "This beer is about pushing the boundaries, it is about taking innovation in beer to a whole new level. Dark and decadent, plum, treacle and roast coffee are amplified beyond any stout you've had before.",
    abv: 32,
    ibu: 1157
    }
  ]
)

const singleBeerStub = JSON.stringify(
  [
    {
    id: 24,
    name: "The End Of History",
    tagline: "The World's Strongest Beer.",
    description: "The End of History: The name derives from the famous work of philosopher Francis Fukuyama, this is to beer what democracy is to history. Complexity defined. Floral, grapefruit, caramel and cloves are intensified by boozy heat.",
    abv: 55,
    ibu: null,
    ingredients: {
    malt: [
    {
    name: "Extra Pale",
    amount: {
    value: 12.5,
    unit: "kilograms"
    }
    }
    ],
    hops: [
    {
    name: "Nelson Sauvin",
    amount: {
    value: 6.25,
    unit: "grams"
    },
    add: "start",
    attribute: "bitter"
    },
    {
    name: "Centennial",
    amount: {
    value: 12.5,
    unit: "grams"
    },
    add: "start",
    attribute: "bitter"
    },
    {
    name: "Nelson Sauvin",
    amount: {
    value: 12.5,
    unit: "grams"
    },
    add: "end",
    attribute: "flavour"
    },
    {
    name: "Amarillo",
    amount: {
    value: 12.5,
    unit: "grams"
    },
    add: "end",
    attribute: "flavour"
    },
    {
    name: "Centennial",
    amount: {
    value: 12.5,
    unit: "grams"
    },
    add: "end",
    attribute: "flavour"
    }
    ],
    yeast: "Wyeast 3522 - Belgian Ardennes™"
    },
    food_pairing: [
    "Roasted wood pigeon with black pudding",
    "Pan seared venison fillet with juniper sauce",
    "Apricot coconut cake"
    ],
    brewers_tips: "You'll have to get this one all the way down to -70°C. Taxidermy is not optional.",
    }
  ]
)

describe('filtered beer list page', () => {

  beforeEach(() => {
    cy.visit('https://brew-meister.herokuapp.com/beers');
  });

  it('should be able to visit the page and see the header, the home button, and the favorite beers button', () => {
    cy.get('.home-button').should('be.visible')
    .get('.brewmeister').should('be.visible')
    .get('.saved-beers-button').should('be.visible');
  });

  it('should be able to find the selection dropdown menu, the searchbar, but the filter button should be hidden until the user selects a search type and inputs a value', () => {
    cy.get('.filter-form').should('be.visible')
    .get('.filter-type').should('be.visible')
    .get('.filter-input').should('be.visible')
    .get('.submit-filter').should('not.be.visible');
  });

  it('should be able to see a message telling the user that no search criteria has been entered', () =>{
    cy.get('.no-search-criteria').contains('No search criteria has been entered, please use the search bar to find some beers!');
  });

  it('should be able to select an option from the dropdown, type into the searchbar, and then the filter button should appear', () => {
    cy.get('.filter-type').select('ABV greater than:')
    .get('.filter-input').type('18')
    .get('.submit-filter').should('be.visible');
  });

  it('should be able to click the filter button and the page will display beer cards for each beer that matches the search criteria', () => {
    cy.get('.filter-type').select('ABV greater than:')
    .get('.filter-input').type('18')
    .intercept('GET', 'https://api.punkapi.com/v2/beers?per_page=80&abv_gt=18', filteredStub)
    .get('.submit-filter').click()
    .get('.beer-cards-container').should('be.visible')
    .get('.beer-cards-container').children().should('have.length', 4);
  });

  it('should be able to filter for some beers, and then see the details of each beer contained within the beer card', () => {
    cy.get('.filter-type').select('ABV greater than:')
    .get('.filter-input').type('18')
    .intercept('GET', 'https://api.punkapi.com/v2/beers?per_page=80&abv_gt=18', filteredStub)
    .get('.submit-filter').click()
    .get('.beer-card').should('be.visible')
    .get('.card-image').should('be.visible')
    .get('.card-name').contains('The End Of History')
    .get('.card-tagline').contains('The World\'s Strongest Beer.')
    .get('.card-stats').contains('ABV: 55 IBU: null')
    .get('.card-button').should('be.visible');
  });

  it('should be able to click on a "Brew Me" button and be redirected to the details page for that beer', () => {
    cy.get('.filter-type').select('ABV greater than:')
    .get('.filter-input').type('18')
    .intercept('GET', 'https://api.punkapi.com/v2/beers?per_page=80&abv_gt=18', filteredStub)
    .get('.submit-filter').click()
    .intercept('GET', 'https://api.punkapi.com/v2/beers/24', singleBeerStub)
    .get('.card-button').first().click()
    .get('.info-name').contains('The End Of History');
  });
});