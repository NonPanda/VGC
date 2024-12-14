import React from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import {signOut} from "firebase/auth";

export default function Navbar({ user }) {
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
        <div className=" w-[100%] flex p-4 bg-bg-contrast shadow-md ">
            
            <h1 className="text-xxl text-white mr-[20%]">VGC</h1>
            <div className="flex items-center space-x-8"> 
            <a href="/" className="text-white">Home</a>
            <a href="/about" className="text-white">About</a>
            <a href="/contact" className="text-white">Contact</a>
            </div>
            <div className="flex ml-[45%] items-center">
                {user ? (
                    <>
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full ml-10"
                        />
                    <button className="bg-secondary text-white px-4 py-2 rounded ml-8 transition duration-500 ease-in-out hover:scale-110" onClick={handleSignOut}>
                        Logout
                    </button>
                    </>
            
                ) : (
                    <button
                        className="bg-secondary text-white px-4 py-2 rounded transition duration-500 ease-in-out hover:scale-110"
                        onClick={handleSignIn}
                    >
                        Login with Google
                    </button>
                )}
            </div>
        </div>
    );
}
