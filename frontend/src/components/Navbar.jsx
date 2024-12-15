import React from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import {signOut} from "firebase/auth";
import {useState,useEffect } from "react";


export default function Navbar({ user }) {

 const [show,isShow] = useState(false);

    const togglenavbar = () => {
        isShow(!show);
    }
 

    
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider); 
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const loggedInUser = result.user;
            console.log("User signed in:", loggedInUser);
        } catch (error) {
            console.error("Error during sign-in:", error.message);
        }
    };
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error during sign-out:", error.message);
        }
    }

    return (
        <>
        <div className={`w-full flex flex-wrap items-center justify-between px-5 py-3 bg-primary ${!show ?"shadow-md" : ""}`}>
            
            <a href="/" className="text-4xl text-text font-bold">VGC</a>
            <div className="space-x-8 hidden sm:flex"> 
            <a href="/" className="text-text">Home</a>
            <a href="/shop" className="text-text">Shop</a>
            <a href="/games" className="text-text">Games</a>
            </div>
            <div className="flex items-center">
                {user ? (
                    <>
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-11 h-11 rounded-full cursor-pointer"
                        />
                    <button className="bg-secondary text-text px-4 py-2 rounded ml-8 transition duration-500 ease-in-out hover:scale-110" onClick={handleSignOut}>
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

            
                <div className={`px-5 py-3 bg-bg-contrast shadow-md  w-full inline-flex flex-col cursor-pointer sm:hidden ${show ? "block" : "hidden"}`}>
                    <a href="/" className="text-text text-right">Home</a>
                    <a href="/shop" className="text-text text-right">Shop</a>
                    <a href="/games" className="text-text text-right">Games</a>
                </div>
    
        </>
    );
}
