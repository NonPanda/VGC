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
            const response = await axios.post('http://localhost:5000/api/purchase', {
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
            <div className="flex flex-col items-center justify-center px-5 py-5 bg-primary rounded-lg border-secondary border-2 shadow-[0px_4px_0px_0px_var(--accent)]">
                <img
                    src={game.image}
                    alt={game.name}
                    className="w-40 h-40 bg-secondary rounded-lg border-accent border-4"
                />
                <h1 className="text-2xl py-2 text-text font-semibold">{game.name}</h1>
                <p className="text-text">${game.price}</p>
                {isPurchased && isShop ? (
                    <button
                        disabled
                        className="mt-2 bg-gray-500 text-white px-3 py-1 rounded-lg cursor-not-allowed"
                    >
                        Purchased
                    </button>
                ) : isPurchased?(
                    <Link to={`/game/${game.id}`} className="mt-2 bg-cool text-text px-3 py-1 rounded-lg hover:text-accent hover:font-do">
                        Play
                    </Link>
            
                )
                : (
                    <Link
                        onClick={handlePurchase}
                        className="text-text mt-4 duration-1000 hover:font-extrabold"
                    >
                        Purchase Game
                    </Link>
                )
            }
               
            </div>
        </div>
    );
}
