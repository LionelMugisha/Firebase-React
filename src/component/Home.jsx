import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from './Products';
import Navbar from './Navbar';
import Loader from './Loader/Loader';
import { auth, fs } from './Config/Config';

const Home = () => {

    //get user uid
    function GetUserUID(){
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUID();
    const navigate = useNavigate();

    //get current user
    function GetCurrentUser(){
        const [user, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if(user){
                    fs.collection('users').doc(user.uid)
                        .get()
                        .then(snapshot => {
                            setUser(snapshot.data().FullName);
                        })
                } else {
                    setUser(null)
                }
            })
        }, [])
        return user;
    }
    const user = GetCurrentUser();

    const [movies, setMovies] = useState([]);
     
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

    useEffect(() => {
        getMovies();
    },[])

    //put movies to the favorite
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
            <Navbar user={user} totalFavorite={totalFavorite} />
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