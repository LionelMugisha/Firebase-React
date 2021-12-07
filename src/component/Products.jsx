import React from 'react'
import MovieItem from './MovieItem';

const Products = ({movies,addToFavorite}) => {
    
    return( 
        <>
          <ul className="flex flex-wrap justify-center">
              {movies.map((individualMovie) => (
                <MovieItem key={individualMovie.ID} individualMovie={individualMovie} addToFavorite={addToFavorite} />
              ))}
          </ul>
        </>
    );
}

export default Products;
