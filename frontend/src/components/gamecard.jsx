
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {getAuth} from 'firebase/auth';


export default function Gamecard({game}) {

    const auth = getAuth();
    const user = auth.currentUser?.uid;
    if (!user) {
        console.error("No user is currently signed in.");
        return;
    }
    
    console.log(user.uid);
    const handlePurchase = async () => {
        try {
           
            console.log(user);
            const response = await axios.post('http://localhost:5000/api/purchase', {userId: user , gameId: game.id});
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-5 flex flex-col items-center justify-center hover:scale-105 transform transition duration-500 ease-in-out">
            <div className="flex flex-col items-center justify-center px-5 py-5 bg-primary rounded-lg border-secondary border-2 shadow-[0px_4px_0px_0px_var(--accent)]">
                <img src={game.image} alt={game.name} className="w-40 h-40 bg-secondary rounded-lg border-accent border-4" />
                <h1 className="text-2xl py-2 text-text font-semibold">{game.name}</h1>
                <p className="text-text">${game.price}</p>
                <button onClick={handlePurchase} className="mt-2 bg-secondary text-text px-3 py-1 rounded-lg">Purchase</button>
                <Link to={`/game/${game.id}`} className="text-text mt-4 duration-1000 hover:font-extrabold">View Game</Link>
            </div>
        </div>
    );
}