import React, { useState, useEffect, useContext } from 'react'
import { fs,auth } from './Config/Config';
import Navbar from './Navbar';
import FavoriteItem from './FavoriteItem';
import { UserContext } from './context/UserContext'
import { MovieContext } from './context/MovieContext'

const Favorite = () => {

    const { user } = useContext(UserContext);
    const { totalFavorite } = useContext(MovieContext);

    const [favorite, setFavorite] = useState([]);
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                fs.collection('Favorite' + user.uid).onSnapshot(snapshot => {
                    const newFavoriteItem = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setFavorite(newFavoriteItem);
                })
            } else {
                console.log('Not signed.')
            }
        })
    },[])

    return (
        <>
            <Navbar user={user} totalFavorite={totalFavorite} />
            {favorite.length > 0 && (
                <div className="flex ml-1 mr-2">
                    <FavoriteItem favorite={favorite} />  
                </div>
            )}
            {favorite.length < 1 && (
                <div className="flex justify-evenly mt-2">
                    <p className="text-2xl text-gray-500 font-semibold">No Favorite Movie Found!</p>
                </div>
            )}
        </>
    )
}

export default Favorite;