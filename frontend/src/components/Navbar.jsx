import React from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import {signOut} from "firebase/auth";
import {useState,useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";


export default function Navbar({ user }) {
 const [show,isShow] = useState(false);

 const handleSignIn = async () => {
     try {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
         const result = await signInWithPopup(auth, provider); 
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token = credential.accessToken;
         const loggedInUser = result.user;
         console.log
         console.log("User signed in:", loggedInUser);
     } catch (error) {
         console.error("Error during sign-in:", error.message);
     }
    }
    
 const handleSignOut = async () => {
     try {
         await signOut(auth);
         console.log("User signed out");
     } catch (error) {
         console.error("Error during sign-out:", error.message);
     }
 }

    const togglenavbar = () => {
        isShow(!show);
    }
    

    

    return (
        <>
            <div className="w-full flex items-center justify-between px-6 py-4 bg-primary shadow-md">
                <Link to="/" className="text-4xl text-text font-extrabold hover:text-accent transition-colors">VGC</Link>
                
                <div className="hidden sm:flex items-center space-x-12"> 
                    <Link to="/" className="text-text text-lg font-medium hover:text-accent transition-colors relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">Home</Link>
                    <Link to="/shop" className="text-text text-lg font-medium hover:text-accent transition-colors relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">Shop</Link>
                    <Link to="/games" className="text-text text-lg font-medium hover:text-accent transition-colors relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">Games</Link>
                </div>
    
                <div className="hidden sm:flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <img
                                src={user.photoURL}
                                referrerPolicy="no-referrer"
                                alt={user.displayName}
                                className="w-10 h-10 rounded-full border-2 border-accent"
                            />
                            <button className="bg-secondary text-text px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all hover:-translate-y-0.5" onClick={handleSignOut}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-secondary text-text px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all hover:-translate-y-0.5"
                            onClick={handleSignIn}
                        >
                            Login
                        </button>
                    )}
                </div>
    
                <button className="sm:hidden p-2 hover:bg-secondary/10 rounded-lg transition-colors" onClick={togglenavbar}>
                    <div className="space-y-1.5">
                        <div className={`w-6 h-0.5 bg-text transition-all ${show ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-text transition-all ${show ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-text transition-all ${show ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </div>
                </button>
            </div>
    
            <div className={`absolute top-[72px] left-0 w-full bg-primary shadow-lg transition-all duration-300 transform ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} sm:hidden`}>
                <div className="flex flex-col p-4 space-y-4">
                    <Link to="/" className="text-text text-lg font-medium py-2 px-4 hover:bg-secondary/10 rounded-md">Home</Link>
                    <Link to="/shop" className="text-text text-lg font-medium py-2 px-4 hover:bg-secondary/10 rounded-md">Shop</Link>
                    <Link to="/games" className="text-text text-lg font-medium py-2 px-4 hover:bg-secondary/10 rounded-md">Games</Link>
                    {user ? (
                        <div className="flex items-center justify-between p-4 border-t border-accent/20">
                            <img
                                src={user.photoURL}
                                referrerPolicy="no-referrer"
                                alt={user.displayName}
                                className="w-10 h-10 rounded-full border-2 border-accent"
                            />
                            <button className="bg-secondary text-text px-4 py-2 rounded-md font-medium hover:bg-opacity-90" onClick={handleSignOut}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-secondary text-text px-4 py-2 rounded-md font-medium hover:bg-opacity-90 mx-4"
                            onClick={handleSignIn}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
