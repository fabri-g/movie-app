# Movie App

This project is a comprehensive movie and TV show information platform that allows users to explore popular, top-rated, and currently playing movies and TV shows. It leverages the TMDb API to fetch and display detailed information, including summaries, ratings, and genres. Users can search for specific titles, view detailed information on a dedicated page for each movie or TV show, and manage their favorite selections.

## Features

- **Movies** Explore popular, top-rated, and now playing movies.
- **TV Shows** Discover popular, top-rated, and currently airing TV shows.
- **Search** Use the search functionality to find movies or TV shows by title.
- **ID Page** View more details of movies or TV shows, including comprehensive summaries, cast information, and more.
- **Favorites** Add movies or TV shows to a favorites list for quick access.

## Technologies Used
### Backend
- **[Node.js](https://nodejs.org/en):** A JavaScript runtime used for creating the server-side of the application.
### Database
- **[TMDb API](https://developer.themoviedb.org/docs/getting-started):** Provides the movie and TV show data used in the application.
### Frontend
- **[React.js](https://react.dev/):** JavaScript library for building user interfaces.
- **[Next.js](https://nextjs.org/):** A React framework that enables server-side rendering.
- **[Ant Design](https://ant.design/):** A comprehensive UI design system based on React.
- **CSS:** Used for styling the application's frontend.
### Authentication
- **[React Context](https://react.dev/reference/react/createContext):** Utilized for managing authentication state across the application.

## Getting Started
1. Clone the repository.
2. Install dependencies using ```npm install```.
3. Run the frontend and backend with ```npm start``` in the root directory.
4. Ensure to configure environment variables if needed, including the TMDb API key.


## Repository Structure
### Backend
Brief overview of the backend structure:
- **resolvers:** Contains GraphQL resolvers for fetching data from the TMDb API.
- **schemas:** efines the GraphQL schemas for the application.
### Frontend
Brief overview of the frontend structure:
- **components:** Contains reusable UI components
- **context:** Holds the React Context files used for managing global state across the application
- **lib:** Includes utility functions and configurations, possibly for interacting with the TMDb API.
- **pages:** Consists of components that correspond to different routes or screens in the application. 
- **styles:** Contains CSS files for styling the application.
- **public:** Used for static files such as images, icons, and other assets that can be publicly accessed by the browser.

## Authors
- Fabricio Gatti - [fabri-g](https://github.com/fabri-g)

