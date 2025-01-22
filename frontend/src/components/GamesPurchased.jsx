import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import Gamecard from './gamecard';
import allGames from './games';
export default function Games() {
    const auth = getAuth();
    const user = auth.currentUser?.uid;

    if (!user) {
        return <h1>Please sign in to view this page</h1>;
    }

    const [gamespurchased, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/purchases?userId=${user}`);
                const purchasedGameIds = response.data.map(id => Number(id)); 
                setGames(purchasedGameIds);
            } catch (error) {
                console.error('Error fetching purchased games:', error);
            }
        };

        fetchGames();
    }, [user]);


    useEffect(() => {
        console.log(gamespurchased);
    }, [gamespurchased]);

    return (
        <div className="mt-5 flex flex-col items-center justify-center pb-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl text-white font-bold">Games</h1>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {allGames
                        .filter(game => gamespurchased.includes(game.id)) 
                        .map(game => (
                            <Gamecard key={game.id} game={game} isPurchased={gamespurchased.includes(game.id)}
                            isShop={false} 
/>
                        ))}
                </div>
            </div>
        </div>
    );
}
