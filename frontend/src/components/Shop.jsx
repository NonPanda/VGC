import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import Gamecard from './gamecard';
import games from './games';
import Stars from './stars';

export default function Shop() {
    const auth = getAuth();
    const user = auth.currentUser?.uid;

    if (!user) {
        return <h1>Please sign in to view this page</h1>;
    }

    const [gamespurchased, setGamesPurchased] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/games/purchased?userId=${user}`);
                const purchasedGameIds = response.data.map(id => Number(id));
                setGamesPurchased(purchasedGameIds);
            } catch (error) {
                console.error('Error fetching purchased games:', error);
            }
        };

        fetchGames();
    }, [user]);

    return (
        <div className="mt-5 flex flex-col items-center justify-center pb-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl text-white font-bold">Shop</h1>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                    {games.map((game) => (
                        <Gamecard
                            key={game.id}
                            game={game}
                            isPurchased={gamespurchased.includes(game.id)}
                            isShop={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
