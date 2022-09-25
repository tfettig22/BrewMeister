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

describe('beer details page', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://api.punkapi.com/v2/beers/24', singleBeerStub)
    .visit('https://brew-meister.herokuapp.com/beer-details/24')
  });

  it('should be able to visit the page and see the header, the home button, and the favorite beers button', () => {
    cy.get('.home-button').should('be.visible')
    .get('.brewmeister').should('be.visible')
    .get('.saved-beers-button').should('be.visible');
  });

  it('should be able to see the beer info section with all of the details of the beer, and the add to favorites button', () => {
    cy.get('.beer-info-section').should('be.visible')
    .get('.info-name').contains('The End Of History')
    .get('.info-tagline').contains('The World\'s Strongest Beer')
    .get('.pairing-prompt').contains('Suggested food pairings:')
    .get('.food-pairing').children().contains('Roasted wood pigeon with black pudding')
    .get('.ingredients-prompt').contains('Ingredients:')
    .get('.yeast-prompt').contains('Yeast:')
    .get('.yeast').contains('Wyeast 3522 - Belgian Ardennes™')
    .get('.malts-prompt').contains('Malts:')
    .get('.malts').contains('Extra Pale')
    .get('.malts').contains('12.5')
    .get('.malts').contains('kilograms')
    .get('.hops-prompt').contains('Hops:')
    .get('.hops-container').children().should('have.length', 5)
    .get('.hops').contains('Nelson Sauvin')
    .get('.hops').contains('6.25 grams')
    .get('.hops').contains('When to add: start')
    .get('.info-description').contains('The End of History: The name derives from the famous work of philosopher')
    .get('.info-brewers-tips').contains('Brewing tips: You\'ll have to get this one all the way down to -70')
    .get('.save-beer-button').should('be.visible');
  });

  it('should be able to click on the add to favorites button and be redirected to the save a beer page', () => {
    cy.get('.save-beer-button').click()
    .get('.save-a-beer-section').should('be.visible')
    .get('.save-card-name').contains('The End Of History');
  });
});