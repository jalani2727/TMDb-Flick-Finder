import React from 'react';

import { 
  Button
 } from 'reactstrap';

class SingleMovie extends React.Component{
    viewMovie() {
        const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
        window.location.href = url
    }
    render() {
        return <div>
          <img width = "150" src={this.props.movie.poster_src} alt="poster"/>
          <h3>{this.props.movie.title}</h3>
          <p>{this.props.movie.overview}</p>
          <Button outline color="info" onClick ={this.viewMovie.bind(this)}>Info</Button>
          </div>
    }
}


export default SingleMovie