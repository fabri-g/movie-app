# Movie App

This project is a comprehensive movie and TV show information platform that allows users to explore popular, top-rated, and currently playing movies and TV shows. It leverages the TMDb API to fetch and display detailed information, including summaries, ratings, and genres. Users can search for specific titles, view detailed information on a dedicated page for each movie or TV show, and manage their favorite selections.

## Features

- **Movies:** Explore popular, top-rated, and now playing movies.
- **TV Shows:** Discover popular, top-rated, and currently airing TV shows.
- **Search:** Use the search functionality to find movies or TV shows by title.
- **ID Page:** View more details of movies or TV shows, including comprehensive summaries, cast information, and more.
- **Authentication:** Secure user authentication implemented using Auth0, allowing users to sign in with multiple identity providers (like Google, Facebook, etc.). Provides a seamless and secure login experience across different devices. 
- **Favorites** Add movies or TV shows to a favorites list for quick access, this list is saved with your user so that you can have it on every device you log in to.

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
- **[Auth0](https://auth0.com/docs):** Utilized for managing authentication across the application and user metadata for the favorites feature.

## Getting Started
1. Clone the repository.
2. Install dependencies using ```npm install```.
3. Run the frontend and backend with ```npm start``` in the root directory.
4. Ensure to configure environment variables if needed, including the TMDb API key.


## Repository Structure
### Backend
Brief overview of the backend structure:
- **api:**  Contains custom Axios instances for external API calls, simplifying the management of request configurations and headers.
- **controllers:** Logic for handling incoming requests and returning responses.
- **middlewares:** Includes middleware functions for Express.js, such as authentication checks.
- **resolvers:** Contains GraphQL resolvers for fetching data from the TMDb API.
- **routes:** Contains the route to handle user authentication. 
- **schemas:** Defines the GraphQL schemas for the application.
- **services:** Encapsulates the business logic of the application, making external API requests and processing data.
- **utils:** Utility functions that provide commonly used functionality throughout the backend.
### Frontend
Brief overview of the frontend structure:
- **components:** Contains reusable UI components
- **contexts:** Holds the React Context files used for managing global state across the application
- **graphql:** Organized storage of GraphQL queries, facilitating easier maintenance and reuse across components.
- **lib:** Includes utility functions and configurations, possibly for interacting with the TMDb API.
- **pages:** Consists of components that correspond to different routes or screens in the application. 
- **styles:** Contains CSS files for styling the application.

## Authors
- Fabricio Gatti - [fabri-g](https://github.com/fabri-g)

