
# Art Exhibition


![Class System Design Drawing](docs/search-art.gif?raw=true "Art")


This is an Art Search app that allows users to search for artworks in the Rijksmuseum collection. Users can search using any term and view the details of each artwork. The app also supports features like dark mode, scroll-to-top button, and more.

## Features

- Search artworks using any term
- View artwork details including title, description, and image
- Dark mode support
- Scroll-to-top button for easy navigation
- About and Contact sections for additional information
- Responsive design for mobile and desktop

## Technologies Used

- React: JavaScript library for building user interfaces
- HTML: Markup language for creating the structure of web pages
- CSS: Styling language for designing the app's appearance
- Rijksmuseum API: API for retrieving artworks from the Rijksmuseum collection

## Getting Started

To get started with the app, follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Install the dependencies: `npm install`
3. Set up the Rijksmuseum API key:
   - Sign up for a Rijksmuseum API key at [https://www.rijksmuseum.nl/en/api](https://www.rijksmuseum.nl/en/api)
   - Copy your API key
   - Create a `.env` file in the project root directory
   - Add the following line to the `.env` file: `REACT_APP_RIJKSMUSEUM_API_KEY=<your_api_key>`
4. Start the development server: `npm start`
5. Open the app in your browser: [http://localhost:3000](http://localhost:3000)


## License

This project is licensed under the [MIT License](LICENSE).

