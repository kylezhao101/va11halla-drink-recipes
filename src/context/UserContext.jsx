import React, { createContext, useContext, useState } from 'react';
import { auth } from '../util/firebase';

export const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    auth.onAuthStateChanged((user) => {
        setCurrentUser(user)
    });

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
}