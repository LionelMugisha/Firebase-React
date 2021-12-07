import React, { useState, useEffect } from 'react'
import { fs,auth } from './Config/Config';
import Navbar from './Navbar';
import FavoriteItem from './FavoriteItem';

const Favorite = ({totalFavorite}) => {

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