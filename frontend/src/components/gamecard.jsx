
import React from 'react';
import { Link } from 'react-router-dom';

export default function Gamecard({game}) {
    return (
        <div className="mt-5 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center px-5 py-5 bg-primary rounded-lg">
                <img src={game.image} alt={game.name} className="w-40 h-40" />
                <h1 className="text-4xl text-text font-bold">{game.name}</h1>
                <p className="text-text">${game.price}</p>
                <Link to={`/game/${game.id}`} className="text-text mt-4">View Game</Link>
            </div>
        </div>
    );
}