import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import Gamecard from './gamecard';
import games from './games';

export default function Shop() {
    const auth = getAuth();
    const user = auth.currentUser?.uid;

    const [gamesPurchased, setGamesPurchased] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchGames = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/purchases?userId=${user}`);
                    const purchasedGameIds = response.data.map(id => Number(id));
                    setGamesPurchased(purchasedGameIds);
                } catch (error) {
                    console.error('Error fetching purchased games:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchGames();
        }
    }, [user]);

    if (!user) {
        return <h1 className="text-center text-3xl text-white mt-10">Please sign in to view this page</h1>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="text-center mb-8">
                <h1 className="text-5xl text-white font-extrabold drop-shadow-lg">Game Shop</h1>
                <p className="text-gray-400 mt-2">Discover and purchase classic games!</p>
            </div>

            <div className="lg:w-[900px] grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-2 max-w-6xl mx-auto">
                {games.map((game) => (
                    <div key={game.id} className="mb-4 transform hover:scale-105 transition-transform duration-300">
                        <Gamecard
                            game={game}
                            isPurchased={gamesPurchased.includes(game.id)}
                            isShop={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
