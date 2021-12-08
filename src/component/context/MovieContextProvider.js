import React, { useEffect, useState, useContext } from 'react';
import { auth, fs } from '../Config/Config';
import { MovieContext } from './MovieContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const MovieContextProvider = (props) => {

    const [movies, setMovies] = useState([]);

    const { uid } = useContext(UserContext);

    //get movies
    const getMovies = async () => {
        const movies = await fs.collection('Movies').get();
        const moviesArray = [];
        for(var movie of movies.docs){
            var result = movie.data();
            result.ID = movie.id;
            moviesArray.push({
                ...result
            })
            if(moviesArray.length === movies.docs.length){
                setMovies(moviesArray);
            }
        }
    } 

    useEffect(() => {
        getMovies();
    },[])
    
    //get total movies in the favorite
    const [totalFavorite, setTotalFavorite] = useState(0);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                fs.collection('Favorite' + user.uid).onSnapshot(snapshot => {
                    const total = snapshot.docs.length;
                    setTotalFavorite(total);
                })
            }
        })
    },[])

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

    const value = {
        movies,
        totalFavorite,
        addToFavorite
    };

    return (
        <MovieContext.Provider value={value}>{props.children}</MovieContext.Provider>
    )
}

export default MovieContextProvider;