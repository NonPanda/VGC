import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

export default function Gamecard({ game, isPurchased, isShop }) {
    const auth = getAuth();
    const user = auth.currentUser?.uid;

    const handlePurchase = async () => {
        if (isPurchased) return;
        try {
            const response = await axios.post('http://localhost:5000/api/purchases', {
                userId: user,
                gameId: game.id,
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className={`mt-5 flex flex-col items-center justify-center transform transition duration-500 ease-in-out ${
                isShop && isPurchased ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
        >
            <div
                className="flex flex-col items-center justify-center px-5 py-5 bg-[rgba(173,216,230,0.25)] backdrop-blur-lg rounded-lg border border-white/50 shadow-[0px_4px_0px_0px_var(--accent)] group relative"
            >
                <img
                    src={game.image}
                    alt={game.name}
                    className="w-48 h-48 bg-bg bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg border-accent border-4"
                />
                <h1 className="text-2xl mt-4 py-3 text-text font-bold">{game.name}</h1>
                <span className="absolute inset-x-0 bottom-16 h-[2px] bg-cool scale-x-0 group-hover:scale-x-50 transition-transform"></span>

                {isPurchased && isShop ? (
                    <button
                        disabled
                        className="mt-2 bg-gray-500 text-white px-3 py-1 rounded-lg cursor-not-allowed font-bold"
                    >
                        Purchased
                    </button>
                ) : isPurchased ? (
                    <Link
                        to={`/game/${game.id}`}
                        className="mt-2 bg-cool text-text px-3 py-1 rounded-lg hover:text-accent hover:font-do"
                    >
                        Play
                    </Link>
                ) : (
                    <Link
                        onClick={handlePurchase}
                        className="text-text duration-500 font-bold px-3 py-1 rounded-lg bg-accent hover:bg-cool transform hover:scale-105 transition-transform ease-in-out"                    >
                        Purchase Game
                    </Link>
                )}
            </div>
        </div>
    );
}
