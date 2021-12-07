import React, { useContext } from 'react';
import Product from './Products';
import Navbar from './Navbar';
import Loader from './Loader/Loader';
import { fs } from './Config/Config';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext'
import { MovieContext } from './context/MovieContext';

const Home = () => {

    const { movies  } = useContext(MovieContext);
    const { uid } = useContext(UserContext);

    const navigate = useNavigate();

    let Movi;
    const addToFavorite = (movie) => {
        if(uid !== null){
            Movi = movie;
            Movi['quantity'] = 1;
            fs.collection('Favorite' + uid).doc(movie.ID).set(Movi)
                .then(() => {
                    console.log('Added to favorite');
                })
        } else {
            navigate('/login');
        }
    }

    return (
        <>
            <Navbar />
            {movies.length > 0 && (
                <div className="max-w-6xl mx-auto rounded-sm mt-1 ml-92">
                    <Product movies={movies} addToFavorite={addToFavorite} />
                </div>
            )}
            {movies.length < 1 && (
                <div className="flex justify-evenly mt-2">
                    <Loader />
                </div>
            )}
        </>
    )
}

export default Home;