import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext'; // Make sure this path matches your project structure
import { firestore } from '../util/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

export const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);
    const currentUser = useUser();

    useEffect(() => {
        if (currentUser) {
            const userRef = doc(firestore, "users", currentUser.uid);
            getDoc(userRef).then(docSnapshot => {
                if (docSnapshot.exists()) {
                    setFavourites(docSnapshot.data().Favourites || []);
                }
            });
        } else {
            setFavourites([]);
        }
    }, [currentUser]);

    const addFavourite = async (drinkId) => {
        if (!currentUser) {
            console.log("User not logged in");
            return;
        }
        const userRef = doc(firestore, "users", currentUser.uid);
        await updateDoc(userRef, {
            Favourites: arrayUnion(drinkId)
        });
        setFavourites(prev => [...prev, drinkId]);
    };

    const removeFavourite = async (drinkId) => {
        if (!currentUser) {
            console.log("User not logged in");
            return;
        }
        const userRef = doc(firestore, "users", currentUser.uid);
        await updateDoc(userRef, {
            Favourites: arrayRemove(drinkId)
        });
        setFavourites(prev => prev.filter(id => id !== drinkId));
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};
