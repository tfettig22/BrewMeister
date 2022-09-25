# BrewMeister

[Deployed Link](https://brew-meister.herokuapp.com/) (The website may take some time to warm up and load for the first time)

## Abstract
Do you like beer? Have you ever tried making your own beer at home? If you have some experience home-brewing, this is the perfect app for you to try out some new beer styles.  BrewMeister is an applicaiton that allows the user to search through hundreds of different beers, each with a brief description of the beer, and a list of all the most important ingredients that go into it.  On page load, the 'Beer of the Day' will display a random selection, and the user can easily navigate to the details page for that beer.  There is a search bar that allows the user to filter the beer lists by several different filter types, including name, abv (alcohol by volume) and ibu (international bitterness units). If the user wants to save a beer recipe for future use, they can press the 'add to favorites' button and the beer will be stored in an external server, and then displayed on the 'favorite beers' page. For now, the server does not persist once it shuts down, but in future additions I plan to connect the server to a database so that the data can be stored more permanently.

* Learning Goals:
    * Demonstrate a strong understanding of React, Router, Asynchronous JavaScript, and E2E testing with Cypress.
    * Create an app for a niche target audience.
    * App development using React hooks in place of class components.
    * Retrieve data from a public API and allow the user to manipulate and store certain pieces of that data.

## Local Set-Up Instructions
The website is hosted on heroku, so you may click the deployed link from above, or you can clone down the repo by following these instructions:
* clone down the repo by running `git clone git@github.com:tfettig22/BrewMeister.git` in the terminal
* run `npm install` in the terminal
* run `npm start` in the terminal

## External Data APIs
- Data was sourced from Punk API's publicly available beer data [API](https://punkapi.com/documentation/v2)

## Technologies Used
- React/JSX
- Heroku
- Express
- Javascript
- HTML/CSS
- Cypress
- fetch API
- Webpack
- GitHub & Git

## GIF

![ezgif com-gif-maker](https://user-images.githubusercontent.com/101140241/192167533-45e48317-b015-4b4a-a2b3-bad50b708f0a.gif)


## Future Additions 
* Delete method to remove beers from the favorites list
* Set up a database so that the data is stored more permanently

## Author

- Tom Fettig [linkedin](https://www.linkedin.com/in/tom-fettig-86323a115/)

## Links

- [Project Spec](https://frontend.turing.edu/projects/module-3/showcase.html)
- Express Server Repo [GitHub](https://github.com/tfettig22/BrewMeister-API)
- API documentation [PunkAPI](https://punkapi.com/documentation/v2)
- Deployed Website [BrewMeister](https://brew-meister.herokuapp.com)
