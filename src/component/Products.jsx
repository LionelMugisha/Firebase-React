import React, { useContext } from 'react'
import MovieItem from './MovieItem';
import { MovieContext } from './context/MovieContext';

const Products = () => {

  const {movies} = useContext(MovieContext);
    
    return( 
        <>
          <ul className="flex flex-wrap justify-center">
              {movies.map((individualMovie) => (
                <MovieItem key={individualMovie.ID} individualMovie={individualMovie} />
              ))}
          </ul>
        </>
    );
}

export default Products;
