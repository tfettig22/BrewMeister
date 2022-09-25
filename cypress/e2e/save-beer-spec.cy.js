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

const postStub = JSON.stringify(
  {
    beerID: 24,
    name: 'The End Of History',
    tagline: 'The World\'s Strongest Beer.',
    abv: 55,
    ibu: null,
    notes: 'This is a test'
  }
);

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

describe('save a beer page', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://api.punkapi.com/v2/beers/24', singleBeerStub)
    .visit('https://brew-meister.herokuapp.com/save-this-beer/24');
  });

  it('should be able to visit the page and see the header, the home button, and the favorite beers button', () => {
    cy.get('.home-button').should('be.visible')
    .get('.brewmeister').should('be.visible')
    .get('.saved-beers-button').should('be.visible');
  });

  it('should be able to see the save a beer section and a beer card corresponding to the selected beer', () => {
    cy.get('.save-a-beer-section').should('be.visible')
    .get('.save-beer-image').should('be.visible')
    .get('.save-card-name').contains('The End Of History')
    .get('.save-card-tagline').contains('The World\'s Strongest Beer.')
    .get('.save-card-stats').contains('ABV: 55 IBU: null');
  });

  it('should have a form for writing some notes to save to the favorited beer', () => {
    cy.get('.save-beer-form').should('be.visible')
    .get('.save-beer-label').contains('Include some notes about how the brewing process went:')
    .get('.brewing-notes').should('be.visible');
  });

  it('should have a button to submit the form, but the button should be disabled until some text is entered', () => {
    cy.get('.submit-button').should('be.disabled')
    .get('.brewing-notes').type('This is a test')
    .get('.submit-button').should('not.be.disabled');
  });

  it('should be able to type into the form, press the submit button, and be taken to the favorite beers page after a short delay', () => {
    cy.get('.brewing-notes').type('This is a test')
    .intercept('POST', 'https://brew-meister-api.herokuapp.com/beers', postStub)
    .get('.submit-button').click()
    .wait(200)
    .intercept('GET', 'https://brew-meister-api.herokuapp.com/beers', savedBeerStub)
    .get('.saved-beers-section').should('be.visible')
    .get('.saved-beer-card').should('be.visible');
  });
});