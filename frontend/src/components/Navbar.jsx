import React from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";

export default function Navbar({ user }) {
    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider); // Pass `auth` and `provider`
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const loggedInUser = result.user;
            console.log("User signed in:", loggedInUser);
        } catch (error) {
            console.error("Error during sign-in:", error.message);
        }
    };

    return (
        <div className="flex justify-between items-center p-4 bg-primary shadow-md">
            <h1 className="text-xl text-white">Notebux</h1>
            <div className="flex items-center">
                {user ? (
                    <>
                        <p className="text-white">{user.displayName}</p>
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-10 h-10 rounded-full ml-2"
                        />
                    </>
                ) : (
                    <button
                        className="bg-secondary text-white px-4 py-2 rounded"
                        onClick={handleSignIn} // Use the new function
                    >
                        Login with Google
                    </button>
                )}
            </div>
        </div>
    );
}
