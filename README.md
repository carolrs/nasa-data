# NY Times Search App

![Class System Design Drawing](docs/ny-times-news.gif?raw=true "News")

# Overview
This project is a search application that utilizes the New York Times and OpenWeatherMap API to fetch and display articles and information about the Weather. The original version of this project was created by following the tutorial "ReactJs News App using the New York Times Articles API" on YouTube(https://www.youtube.com/watch?v=m2aYEl14ekY). However, I have added new features and personalized the all CSS to make it my own.

# New Features Included by me:

- **Navigation Bar**: Navigate through different sections like "About" and "Contact".
- **Dark Mode**: A feature to switch between light and dark themes.
- **Web Share API**: Share articles easily using the Web Share API.
- **Pagination**: Navigate through different articles using the pagination system.
- **Read Later Function**: Save articles for reading later.
- **List of Saved Articles**: Access all the articles you've saved for reading later.
- **Subscription**: Subscribe button that redirects to the New York Times subscription page.
- **Weather Information**: This feature shows weather information of the user's current location using the OpenWeatherMap API.
- **Dynamic Background**: The background of the weather information changes according to the weather.
- **Geolocation**: The application retrieves the user's current location and uses it to fetch weather information.

## Weather Information with Geolocation

The weather information feature uses the OpenWeatherMap API to fetch current weather information based on the user's geolocation. It uses the `navigator.geolocation` web API to get the current location of the user (latitude and longitude). If the geolocation service is not enabled or available, it defaults to a predefined location.

Additionally, this feature includes a dynamic background that changes based on the weather. For example, if it's snowing, the background image will be one that suits a snowy atmosphere. The images are fetched from Pexels API.

The geolocation feature is safe to use as it only accesses the location data when the user permits it. If the user doesn't allow location access, the feature won't work but the application will continue to function normally.

# Original Features 

* Search for articles.
* Display article information 
* Links to the full articles.

# Pre-requisites
* Node.js installed on your machine.
* An API key from the New York Times API.
* An API key from the OpenWeatherMap API.

# Installation
* Clone this repository by running `git clone <https://github.com/carolrs/news-article>` in your terminal.

* Install the necessary dependencies with `npm install` or `yarn install`.

* Create a .env file in the root of your project.

* Inside this file, you should set your New York Times API Key and your OpenWeatherMap API key like this:

```
REACT_APP_NYT_API_KEY=your_nyt_api_key_here
REACT_APP_OWM_API_KEY=your_owm_api_key_here
```

* Run the project locally with `npm start` or `yarn start`.

Your app should now be running on `localhost:3000`.

# Usage

Simply type your search term in the search bar and press 'Search'. The results will be fetched from the New York Times API and displayed on the page. You can click 'Read More' to go to the full article.

# Acknowledgements

This project was initially created by following the tutorial "ReactJs News App using the New York Times Articles API" on YouTube(https://www.youtube.com/watch?v=m2aYEl14ekY). I have extended the project by adding new features and customizing the app.

