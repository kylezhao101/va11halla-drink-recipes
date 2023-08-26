import React, { createContext, useContext, useState } from 'react';
import { auth } from '../util/firebase';
import userEvent from '@testing-library/user-event';

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    const [currentUser, setCurrentUser] = useState();

    auth.onAuthStateChanged((authUser) => {
        setCurrentUser(auth.currentUser)
    });

    return (
        <UserContext.Provider value = {currentUser}>
            {children}
        </UserContext.Provider>
    );
}