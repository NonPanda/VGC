import React from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import {signOut} from "firebase/auth";
import {useState,useEffect } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";


export default function Navbar({ user }) {
 const [open,isOpen] = useState(false);

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

    const toggleNavbar = () => {
        isOpen(!open);
    }
    

    

    return (
        <>
            <div className="w-full flex items-center justify-between px-6 py-1 bg-primary shadow-md relative z-50">
                                      <Link to="/" className="flex items-center text-text group transition-colors">
                        <img src={logo} alt="VGC" className="w-14 h-14 mr-2" />
                        <span className="text-4xl font-extrabold text-text group-hover:text-secondary transition-colors">VGC</span>
                    </Link>  

                <div className="hidden sm:flex items-center space-x-10"> 
                    <Link to="/shop" className="text-text text-2xl hover:text-accent transition-colors relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">Shop</Link>
                    <Link to="/games" className="text-text text-2xl hover:text-accent transition-colors relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">Games</Link>
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
                            className="bg-secondary opacity-80 text-text px-6 py-2 rounded-md font-medium hover:opacity-100 transition-all"
                            onClick={handleSignIn}
                        >
                            Login
                        </button>
                    )}
                </div>
    
                <button className="sm:hidden p-2 bg-secondary rounded-lg" onClick={toggleNavbar}>
                     <div className="w-6 h-[2px] bg-text"></div>
                    <div className="w-6 h-[2px] bg-text mt-1"></div>
                    <div className="w-6 h-[2px] bg-text mt-1"></div>
                </button>
            </div>
    
            <div 
                className={`top-[62px] left-0 w-full bg-primary shadow-lg transition-all duration-300 transform z-40
                    ${open ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'} 
                    sm:hidden`}
            ><div className="flex flex-col p-4 space-y-4">
                    <Link to="/shop" className="text-text text-lg font-medium py-2 px-4 hover:bg-secondary/10 rounded-md">Shop</Link>
                    <Link to="/games" className="text-text text-lg font-medium py-2 px-4 hover:bg-secondary/10 rounded-md">Games</Link>
                    {user ? (
                        <div className="flex items-center justify-between pt-2 pb-0 px-2 border-t border-accent">
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
