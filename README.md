Pursuit of Hoppiness - Client

## What is it?
Pursuit of Hoppiness is a beer and brewery tracker. You can search for a specific beer or brewery to find starter information, then rate them and store them in the application for later retreival. This app uses two third party APIs - BreweryDb to search a limited database of beers, and Yelp to find information for breweries based on location.

## Back-end
- repo: https://github.com/cande04/pursuit-of-hoppiness-api
- deployed site: https://pursuit-of-hoppiness-04.herokuapp.com/

## List of Front End Technologies
- HTML
- CSS
- React
- Material-UI
- Javascript

## Set Up and Installation
- npm install
- npm install @material-ui/core

## Planning
Knowing that I wanted to integrate with a third party API for this project, I began planning by researching fun and fairly easy to use APIs. I frequently came across BreweryDB, and read numerous positive reviews - this and having a love for all things beer sparked the idea for my project.

My original plan for the application was to use the data from BreweryDB to search for information for both breweries and beer. From here, I could create a relationship in my own database between a brewery and their brewed beers.

## User Stories
- As a user, I would like to search for a brewery or a beer
- As a user, I would like to rate and review a brewery or a beer
- As a user, I would like to access the breweries and beers I’ve previously rated
- As a user, I would like to delete or edit my notes about a brewery or a beer

## Wireframes
![Imgur](https://i.imgur.com/omlgZNQ.jpg)

## Screenshot of Application
![Imgur](https://i.imgur.com/Xxg9IWi.png)

## Development and Problem Solving
I decided to develop the application in iterations - my plan was to integrate with BreweryDB and complete CRUD actions with beer first. From there, I would create an API request to search breweries, establish the relationship between breweries and beer on the back end, and complete CRUD actions with breweries.

On the first iteration, I mistakenly only tested the API request by searching "bud light". I was pleasantly surprised by the data returned and continued with development. It wasn't until after I was ready to move onto the second iteration of the application that I tested the request with an actual craft beer. Unfortunately, the data with the BreweryDB sandbox was extremely limited and many of the beers I searched didn't exist in the sandbox data. After realizing how poor of a user experience this was, I decided I would use a different API for breweries - which led me to Yelp.

I tested multiple Yelp endpoints and found that searching for a specific business name was more difficult than anticipated so I had to make yet another pivot. I ended up using the location parameter to search for breweries by a specific location.

## Future Iterations
For future iterations, I would like to find another beer API that has a bit more robust database than the BreweryDB sandbox. I'd like users to be able to select a brewery, search their specific beers, and be able to rate and review beers through this channel. It would also be nice to include a beer or brewery "bucket list" where you can add breweries you'd like to try, then rate them once you've been there.

I would also like to use more CSS transitions with material-ui and styled components. A lot of the styling and formatting is standard and baisc material-ui paper and card components.
