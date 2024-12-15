import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useEffect } from 'react'




function Square({ value, onSquareClick }) {
    return (
        <button
            className="w-28 h-28 bg-accent text-text font-bold text-4xl"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default function Tictactoe() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const [squares, setSquares] = React.useState(Array(9).fill(null));
    const [winner, setWinner] = React.useState(null);
    const [wins, setWins] = React.useState([0, 0]);
    const [roundWinners, setRoundWinners] = useState(["", "", ""]);


    function handleClick(i) {
        if (squares[i] !== null || winner) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = 'X';
        setSquares(newSquares);

        const currentWinner=checkWin(newSquares);
        if (currentWinner){
            setWinner(currentWinner);
            updateWins(currentWinner);
            return;
        }

        while(true&&newSquares.includes(null) && !winner) {
            const random=Math.floor(Math.random() * 9);
            if (newSquares[random]===null) {
                newSquares[random]='O';
                break;
            }
        }

        const finalWinner=checkWin(newSquares);
        if (finalWinner){
            setWinner(finalWinner);
            updateWins(finalWinner);
        }
        setSquares(newSquares);
    }

    function checkWin(squareCheck){
        for (let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i];
            if (squareCheck[a] && squareCheck[a] === squareCheck[b] && squareCheck[a] === squareCheck[c]) {
                return squareCheck[a]; 
            }
        }
        if (!squareCheck.includes(null)) {
            setWinner("Tie");
            return "Tie";
        }
        return null;
    }

    function updateWins(player) {
        if (player === 'X') {
            setWins([wins[0] + 1, wins[1]]);
        } else if (player === 'O') {
            setWins([wins[0], wins[1] + 1]);
        }
    }

    function handleWin() {
        setSquares(Array(9).fill(null));
        setWinner(null);
    }

    return (
        <div className="mt-5 flex flex-col items-center justify-center">
    {/* Header: Player Scores */}
    <div className="flex justify-center items-center gap-20 w-full px-10 mb-2">
    <div className="flex flex-col items-center ml-10">
        <h1 className="text-2xl text-text font-bold">You (X) </h1>
        <span className="text-xl text-secondary font-bold">{wins[0]}</span>
    </div>
    <div className="flex flex-col items-center">
        <h1 className="text-2xl text-text font-bold">Baby (O)</h1>
        <span className="text-xl text-secondary font-bold">{wins[1]}</span>
    </div>
</div>

    {/* Game Area */}
    <div className="flex flex-col items-center justify-center px-5 py-5 bg-primary rounded-lg shadow-lg">
        <button className="bg-accent text-text px-4 py-2 rounded mb-5" onClick={handleWin}>Reset</button>
        <div className="grid grid-cols-3 gap-6 mb-3">
            {squares.map((value, index) => (
                <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
            ))}
        </div>

        <div className="flex justify-center gap-9">
    {/* Circle for X */}
    <div className="flex flex-col items-center">
        <div
            className={`w-12 h-12 border-4 rounded-full ${winner === 'X' ? 'bg-accent border-secondary' : 'bg-primary border-accent'}`}
        ></div>
        <span className="text-text mt-2">You</span>
    </div>

    {/* Circle for O */}
    <div className="flex flex-col items-center">
        <div
            className={`w-12 h-12 border-4 rounded-full ${winner === 'O' ? 'bg-accent border-secondary' : 'bg-primary border-accent'}`}
        ></div>
        <span className="text-text mt-2">Baby</span>
    </div>

    {/* Circle for Tie */}
    <div className="flex flex-col items-center">
        <div
            className={`w-12 h-12 border-4 rounded-full ${winner === 'Tie' ? 'bg-accent border-secondary' : 'bg-primary border-accent'}`}
        ></div>
        <span className="text-text mt-2">Tie</span>
    </div>
</div>

        
    </div>
</div>

    

       
    );
}



    