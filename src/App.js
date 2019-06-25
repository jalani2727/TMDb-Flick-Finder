import React, { Component } from 'react';
import './App.css';

import {  
  Col,
  Container,
  Row 
} from 'reactstrap';

import SingleMovie from './components/SingleMovie'
import $ from 'jquery';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies:[]
    }


    this.performSearch("spiderman")
    }

    performSearch(searchTerm) {
      console.log("search performed on MovieDB")
      const urlString = 'https://api.themoviedb.org/3/search/movie?&api_key=f946411f986f514dc8e31d2ae1f5de10&query='+ searchTerm

      $.ajax({
        url: urlString,
        success: (searchResults) => {
          console.log("Fetch successful")
          
          const results = searchResults.results
          
          var singleMovies = []
          results.forEach((item) => {
            item.poster_src = 'https://image.tmdb.org/t/p/w185/'+item.poster_path


            singleMovies.push(item)
          }) 


          this.setState({
            movies:singleMovies
          })
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
    
        <Container fluid>
        
          <Row className="titleBar">
            <img alt="app icon" width="50" src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"/>
           <h1>Flick-Finder</h1>
          </Row>

          <Row sm="12">
            <input onChange={this.searchChangeHandler.bind(this)} className="searchBar" placeholder="Search..."/>
          </Row>
 
          <Row>
          {this.state.movies.map(movie =>
            <Col key={movie.id} className="App" xs="6" sm="4">
            <SingleMovie key={movie.id} movie={movie}/>
            </Col>
          )}
          </Row>
        
        </Container>
    
    );
  }
}
export default App;
