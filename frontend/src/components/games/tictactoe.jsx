import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useEffect } from 'react'




function Square({value, onSquareClick}) {
   
    return (

        <button className="w-40 h-40 bg-secondary text-text font-bold text-4xl" onClick={onSquareClick}>{value} </button>
    );
}
export default function Tictactoe() {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const [squares, setSquares] = React.useState(Array(9).fill(null));
    const [winner, setWinner] = React.useState(null);
    function handleClick(i) {
        if (squares[i] !== null||winner) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[i] = 'X';
        setSquares(newSquares);
        const currentwinner = checkWin(newSquares);
        if(currentwinner){
            setWinner(currentwinner);
            return;
        }
        

        while(true&&newSquares.includes(null)&&!winner){
      
            const random = Math.floor(Math.random() * 9);
            if(newSquares[random] === null){
                newSquares[random] = 'O';
                break;
            }
        }
        const finalwinner= checkWin(newSquares);
        if(finalwinner){
            setWinner(finalwinner);
        }
        setSquares(newSquares);



        
    }
    function checkWin(squareCheck){
        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if(squareCheck[a] && squareCheck[a] === squareCheck[b] && squareCheck[a] === squareCheck[c]){
                return(squareCheck[a]);
            }

        }
        return null;

    }
    function handleWin(){
        setSquares(Array(9).fill(null));
        setWinner(null);
    }


    return (
        <div className="mt-5 flex items-center justify-center">
            <h1 className="text-4xl text-text font-bold">Tic Tac Toe</h1>
            <div className="flex flex-col items-center justify-center px-5 py-5 bg-primary rounded-lg">
                <div className={`text-4xl text-text font-bold ${!winner?"hidden":""}`}>{winner} has won! Try again? 
                    <button className="bg-secondary text-text px-4 py-2 rounded ml-8 transition duration-500 ease-in-out hover:scale-110" onClick={handleWin}>Yes</button>


                    
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <Square value={squares[0]} onSquareClick={() =>handleClick(0)}  />
                    <Square value={squares[1]} onSquareClick={() =>handleClick(1)}  />
                    <Square value={squares[2]} onSquareClick={() =>handleClick(2)}  />
                    <Square value={squares[3]} onSquareClick={() =>handleClick(3)}  />
                    <Square value={squares[4]} onSquareClick={() =>handleClick(4)}  />
                    <Square value={squares[5]} onSquareClick={() =>handleClick(5)}  />
                    <Square value={squares[6]} onSquareClick={() =>handleClick(6)}  />
                    <Square value={squares[7]} onSquareClick={() =>handleClick(7)}  />
                    <Square value={squares[8]} onSquareClick={() =>handleClick(8)}  />


                </div>
            </div>
            <h1 className="text-4xl text-text font-bold">Computer</h1>

        </div>


       
    );
}


    