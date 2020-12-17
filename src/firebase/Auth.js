import React, { useState, useEffect } from 'react';
import firebaseApp from './Firebase';

export const AuthContext = React.createContext();

// user = firebaseApp.getInstance().getCurrentUser();
// userid = user.getUid();
// console.log(userid)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    firebaseApp.auth().onAuthStateChanged((user) => {
        //This is how you get the user id once he logs in. 
        //Check your browser console by inspecting the page.
        if (user) {
            // User logged in already or has just logged in.
            console.log("User has logged in and userid is")
            //console.log(user.uid);
            //console.log('printname')
            //console.log(user.email)
        } else {
            // User not logged in or has just logged out.
            console.log("User not logged in")
        }
    });

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoadingUser(false);

        });
    }, []);
    if (loadingUser) {
        return <div>Loading....</div>;
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};