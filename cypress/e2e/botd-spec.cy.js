const randomBeerStub = JSON.stringify(
  [
    {
    id: 180,
    name: "Doodlebug",
    tagline: "Hoppy Sub-Session Pale Ale.",
    description: "Doodlebug is our fusion of low strength and enormously high tropical hop levels – think a mashup of Hop Fiction and How to Disappear Completely, and you’re almost there. Clocking in at 2.8% ABV, Doodlebug is keg-only and is packed with Amarillo, Chinook and Mosaic; letting fly a hoppy buzzbomb at sub-session-strength.",
    abv: 2.5,
    ibu: 35,
    }
  ]
);

describe('beer of the day, home page', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://api.punkapi.com/v2/beers/random', randomBeerStub)
    .visit('https://brew-meister.herokuapp.com/');
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
    .get('.submit-filter').should('not.be.visible')
  });

  it('should be able to select an option from the dropdown, type into the searchbar, and then the filter button should appear', () => {
    cy.get('.filter-type').select('ABV greater than:')
    cy.get('.filter-input').type('10')
    cy.get('.submit-filter').should('be.visible');
  });

  it('should be able to see an image and beer details corresponding to the random "beer of the day"', () => {
    cy.get('.botd-section').should('be.visible')
    .get('.botd-header').contains('Beer of the day:')
    .get('.botd-image').should('be.visible')
    .get('.botd-name').contains('Doodlebug')
    .get('.botd-tagline').contains('Hoppy Sub-Session Pale Ale.')
    .get('.botd-description').contains('Doodlebug is our fusion of low strength')
    .get('.botd-stats').contains('ABV: 2.5 IBU: 35')
    .get('.botd-button').should('be.visible');
  });
});