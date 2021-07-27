import React from 'react';
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component{
  state = {
    isLoading: true,
    movies: []
  }

  // add = () => { 
  //   // relying on the state directly is an anti-pattern
  //   // `current` is equivalent to `this.state`
  //   this.setState(current => ({ count: current.count + 1})) 
  // };
  // minus = () => { this.setState({ count: this.state.count - 1}) };

  // can use either `fetch` or `axios` to fetch data
  // We need to grab the data that comes from the axios request so we can use it in our state
  // axios.get() is not always fast -> We need to tell JS that componentDidMount() might take time to finish so we want to wait for it

  // async-await: indicate a function is an async and await for the axios request to get back with a response
  // await cannot be used outside async
  getMovies = async () => {
    const { 
      data: { 
        data: { movies } 
      } 
    } = await axios.get(
      // "https://yts-proxy.nomadcoders1.now.sh/list_movies.json" //?sort_by=rating -> causes error
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating" 
      );
    // console.log(movies);
    this.setState({ movies, isLoading: false });
    // await fetch("https://yts-proxy.nomadcoders1.now.sh/list_movies.json")
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  }

  componentDidMount(){
    this.getMovies();
  }

  render(){
    // setState triggers re-render
    const { isLoading, movies } = this.state;
    return (
      <>
        <section className="container">
          { isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : (
            <div className="movies">
              {movies.map(movie => {
              // console.log(movie);
                return (
                  <Movie 
                    key={movie.id}
                    id={movie.id} 
                    year={movie.year} 
                    title={movie.title} 
                    summary={movie.summary} 
                    poster={movie.medium_cover_image}
                    genres={movie.genres}
                  />
              )})}
            </div>
            )
          }
        </section>
      </>
    )  
  }
}

export default Home;

// component - a function that returns html
// jsx - js + html

// ---------------------------------
// How to deploy an app on github?

// 0
// $ npm install gh-pages

// 1
// In package.json add:
// "homepage": "https://okj203.github.io/react_movie/"

// 2
// $ npm run build // `build` (output of our app) folder gets generated

// 3
// In package.json add:
// "scripts": {
//   "deploy": "gh-pages -d build",
//   "predeploy": "npm run build" 
// }

// 4
// $ npm run deploy
// Every time we run `npm run deploy` predeploy will run first and run `npm run build` to re-bundle our build folder
// Above command is run every time we want to update and re-publish our app

// 5
// Go check out "https://okj203.github.io/react_movie/"