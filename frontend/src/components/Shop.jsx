
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useEffect } from 'react'
import Gamecard from './gamecard'

//6 game cards
const game = [
    {
        id: 1,
        name: "Tic Tac Toe",
        price: 59.99,
        image: "../src/assets/tic.png"
    },
    {
        id: 2,
        name: "Snake",
        price: 59.99,
        image: "../src/assets/snake.png"
    },
    {
        id: 3,
        name: "Pong",
        price: 59.99,
        image: "../src/assets/ping.png"
    },
    {
        id: 4,
        name: "Match Cards",
        price: 59.99,
        image: " ../src/assets/match.png"
    },
]

    


export default function Shop() {
    return (
        <div className="mt-5 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl text-white font-bold">Shop</h1>
                <div className="grid grid-cols-3 gap-4">
                    {game.map((game) => (
                        <Gamecard key={game.id} game={game} />
                    ))}
                </div>
            </div>


        

        </div>
    );
}