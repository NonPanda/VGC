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
        <div className={`w-full flex flex-wrap items-center justify-between px-5 py-3 bg-primary ${!show ?"border-b-accent border-b-4" : ""}`}>
            
            <Link to="/" className="text-4xl text-text font-extrabold">VGC</Link>
            <div className="space-x-8 hidden sm:flex"> 
            <Link to="/" className="text-text text-xl relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">Home</Link>
            <Link to="/shop" className="text-text text-xl relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">Shop</Link>
            <Link to="/games" className="text-text text-xl relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">Games</Link>
            </div>
            <div className="flex items-center">
                {user ? (
                    <>
                        <img
                            src={user.photoURL}
                            referrerPolicy="no-referrer"
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                    <button className="bg-secondary text-text px-3 py-1 rounded-md font-bold ml-6 transition duration-500 ease-in-out hover:scale-110" onClick={handleSignOut}>
                        Logout
                    </button>
                    </>
            
                ) : (
                    
                    <button
                        className="bg-secondary text-text px-4 py-2 rounded transition duration-500 ease-in-out hover:scale-110"
                        onClick={handleSignIn}
                    >
                        Login
                    </button>
                )}
        </div>

                <div className="flex flex-col items-center justify-center space-y-1 cursor-pointer sm:hidden" onClick={togglenavbar}>
                    <div className="w-6 h-1 bg-text"></div>
                    <div className="w-6 h-1 bg-text"></div>
                    <div className="w-6 h-1 bg-text"></div>
                </div>
                </div>

            
                <div className={`px-5 bg-primary border-b-accent border-b-4 w-full h-full inline-flex flex-col cursor-pointer sm:hidden ${show ? "block" : "hidden"}`}>
                    <Link to="/" className="text-text text-xl py-3">Home</Link>
                    <Link to="/shop" className="text-text text-xl py-3">Shop</Link>
                    <Link to="/games" className="text-text text-xl py-3">Games</Link>
                    {user ? (
                        <>
                            <img
                                src={user.photoURL}
                                referrerPolicy="no-referrer"
                                alt={user.displayName}
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                            <button className="bg-secondary text-text px-4 py-2 rounded ml-6 transition duration-500 ease-in-out hover:scale-110" onClick={handleSignOut}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            className="bg-secondary text-text px-4 py-2 rounded transition duration-500 ease-in-out hover:scale-110"
                            onClick={handleSignIn}
                        >
                            Login
                        </button>
                    )}
                </div>
    
        </>
    );
}
