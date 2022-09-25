const savedBeerStub = JSON.stringify(
  {
    beers: [
      {
        id: 12345,
        beerID: 24,
        name: 'The End Of History',
        tagline: 'The World\'s Strongest Beer.',
        abv: 55,
        ibu: null,
        notes: 'This is a test'
      }
    ]
  }
);

const emptyStub = JSON.stringify(
  {
    beers: []
  }
);

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
);

describe('favorite beers page', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://brew-meister-api.herokuapp.com/beers', emptyStub)
    .visit('https://brew-meister.herokuapp.com/saved-beers/');
  });

  it('should be able to visit the page and see the header, the home button, and the favorite beers button', () => {
    cy.get('.home-button').should('be.visible')
    .get('.brewmeister').should('be.visible')
    .get('.saved-beers-button').should('be.visible');
  });

  it('should display a message if the user does not have any saved beers', () => {
    cy.get('.saved-beers-section').should('be.visible')
    .get('.no-saved-beers').contains('You dont have any saved beers yet, find a recipe that sounds good and give it a shot!');
  });

  it('should be able to find the user\'s saved beers', () => {
    cy.intercept('GET', 'https://brew-meister-api.herokuapp.com/beers', savedBeerStub)
    .get('.saved-beers-section').should('be.visible')
    .get('.saved-beer-card').should('be.visible')
    .get('.saved-beer-name').contains('The End Of History')
    .get('.saved-beer-tagline').contains('The World\'s Strongest Beer.')
    .get('.saved-beer-stats').contains('ABV: 55 IBU: null')
    .get('.saved-beer-notes').contains('This is a test');
  });

  it('should have a button to take the user back to the beer details page if they want to brew their favorite beer again', () => {
    cy.intercept('GET', 'https://brew-meister-api.herokuapp.com/beers', savedBeerStub)
    .get('.saved-beers-section').should('be.visible')
    .intercept('GET', 'https://api.punkapi.com/v2/beers/24', singleBeerStub)
    .get('.brew-again-button').click()
    .get('.beer-info-section').should('be.visible');
  });
});