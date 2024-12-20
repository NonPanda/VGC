
import React from 'react';
import { Link } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
    


function Home() {
    // const auth = getAuth();
    //     const user = auth.currentUser?.uid;
    //     if (!user) {
    //         console.error("No user is currently signed in.");
    //         return;
    //     }
    return (

        <div className="mt-20 flex flex-col items-center justify-center h-[100%] bg-bg-primary">
            <img src="../src/assets/supermarket.png" alt="supermarket" className="w-[30%]" />
            <h1 className="text-4xl text-white font-bold">Welcome to VGC</h1>
            <p className="text-white">Your one stop shop for all things video games</p>
            <Link to="/shop" className="text-white mt-4">Shop Now</Link>
        </div>

    );
}
export default Home;