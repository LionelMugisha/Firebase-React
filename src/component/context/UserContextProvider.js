import React, { useEffect, useState } from 'react';
import { auth, fs } from '../Config/Config';
import { UserContext } from './UserContext';

const UserContextProvider = (props) => {

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

    const value = {
        uid,
        user,
    };

    return (
        <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
    )
}

export default UserContextProvider;