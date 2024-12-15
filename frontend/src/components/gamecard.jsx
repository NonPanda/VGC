
import React from 'react';
import { Link } from 'react-router-dom';

export default function Gamecard({game}) {
    return (
        <div className="mt-5 flex flex-col items-center justify-center hover:scale-105 transform transition duration-500 ease-in-out">
            <div className="flex flex-col items-center justify-center px-5 py-5 bg-primary rounded-lg border-secondary border-2 shadow-[0px_4px_0px_0px_var(--accent)]">
                <img src={game.image} alt={game.name} className="w-40 h-40 bg-secondary rounded-lg border-accent border-4" />
                <h1 className="text-2xl py-2 text-text font-semibold">{game.name}</h1>
                <p className="text-text">${game.price}</p>
                <Link to={`/game/${game.id}`} className="text-text mt-4 duration-1000 hover:font-extrabold">View Game</Link>
            </div>
        </div>
    );
}