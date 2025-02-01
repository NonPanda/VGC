
import React from 'react';
import { Link } from 'react-router-dom';

import { getAuth } from 'firebase/auth';
import Stars from './stars';
import arcade from '../assets/arcade.png';

    


function Home() {

    return (

        <div className="mt-20 flex flex-col items-center justify-center h-[100%] bg-bg-primary">
            <Stars />
            <canvas id="bg" className="fixed top-0 left-0 w-full h-full z-[-1]"></canvas>
            <h1 className="text-4xl text-white font-bold">Welcome to VGC</h1>
            <p className="text-white">Your one stop shop for all things video games</p>
            <img src={arcade} alt="arcade" className="max-w-md max-h-[25rem] mt-5 animate-float" />
            <Link to="/shop" className="text-white mt-4 font-bold text-2xl">Play Now</Link>
        </div>

    );
}
export default Home;