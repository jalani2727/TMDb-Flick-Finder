import React, { Component } from 'react';
import './App.css';
import MovieRow from './components/movieRow'
import $ from 'jquery';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}


    this.performSearch("a")
    }

    performSearch(searchTerm) {
      console.log("search performed on MovieDB")
      const urlString = 'https://api.themoviedb.org/3/search/movie?&api_key=f946411f986f514dc8e31d2ae1f5de10&query='+ searchTerm

      $.ajax({
        url: urlString,
        success: (searchResults) => {
          console.log("Fetch successful")
          
          const results = searchResults.results
          
          var movieRows = []
          results.forEach((movie) => {
            
            movie.poster_src = 'https://image.tmdb.org/t/p/w185/'+movie.poster_path
            const movieRow = <MovieRow key={movie.id}movie = {movie}/>
            movieRows.push(movieRow)
          }) 

          this.setState({rows:movieRows})
        },
        error: (xhr, status, error) => {
          console.log("Failed to fetch data")
        }
      })
    }

    searchChangeHandler(e){
      console.log(e.target.value)
      const boundObject = this
      const searchTerm = e.target.value
      boundObject.performSearch(searchTerm)
    }
  render() {
    return (
      <div >
        
          
          <table className="titleBar">
            <tbody>
              <tr>
                <td>
                  <img alt="app icon" width="50" src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"/>
                </td>
                <td width= '8' />
                <td>
                  <h1>Flick-Finder</h1>
                </td>
              </tr>
            </tbody>
          </table>

          <input onChange={this.searchChangeHandler.bind(this)} className="searchBar" placeholder="Enter Search Term"/>
          {this.state.rows}
  
          
      
      </div>
    );
  }
}
export default App;
