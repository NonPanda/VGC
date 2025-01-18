import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import robot from '../../assets/robot.png'
import retry from '../../assets/retry.svg'
//1918,1401



function Square({ value, onSquareClick }) {
    return (
        <button
            className="w-24 h-20 bg-accent text-text font-semibold text-4xl border-2 border-cool px-0 py-0 transition-all duration-200 ease-in-out hover:border-4"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default function Tictactoe({user}) {
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
    const [userId, setUserId] = useState(null);
    const [streak, setStreak] = useState(0);
    const [highscore, setHighscore] = useState(0);
    const robotImage = robot;
    const userProfilePicture = user?.photoURL;
    

    useEffect(() => {
        if (user) {
          setUserId(user.uid);

    
          const fetchHighscore = async () => {
            try {
              const response = await axios.get("http://localhost:5000/api/highscores", {
                params: {
                  userId: user.uid,
                  gameId: "1",
                },
              });
              console.log("Highscore Fetch Response:", response.data);
    
              if (response.data && response.data.highscore !== undefined) {
    
                setHighscore(response.data.highscore);
    
              } else {
                setHighscore(null);
              }
            } catch (error) {
              console.error("Failed to fetch highscore:", error);
            }
          };
    
          fetchHighscore();
        }
        else {
            console.warn('User is not logged in!');
        }
      }, [user]);






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
            setStreak((prevStreak) => {
                const newStreak = prevStreak + 1;
                if (newStreak > (highscore || 0)) {
                const postHighscore = async () => {
                    try {
                        const response = await axios.post('http://localhost:5000/api/highscores', {
                            userId,
                            gameId: '1',
                            score: newStreak,
                        });
                        setHighscore(newStreak);
                        console.log('Highscore Updated:', newStreak);
                    } catch (error) {
                        console.error('Failed to post highscore:', error);
                    }

                };

                postHighscore();
            }
            return newStreak;
        });
        } else if (player === 'O') {
            setWins([wins[0], wins[1] + 1]);
            setStreak(0);
        }
    }

    function handleWin() {
        setSquares(Array(9).fill(null));
        setWinner(null);
    }

    return (
        <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col items-center justify-center space-y-8">
  {/* Players Section */}
  <div className="flex justify-center items-center gap-16 w-full px-10">
    {/* Player 1 (User) */}
    <div className="flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img 
          src={userProfilePicture} 
          alt="User" 
          className="w-20 h-20 rounded-full object-cover border-2 border-secondary" 
        />
        <div className="absolute -bottom-2 -right-2 bg-[#3cc4bf] rounded-full p-2">
          <span className="text-white font-bold">{wins[0]}</span>
        </div>
      </div>
    </div>

    {/* Player 2 (CPU) */}
    <div className="flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img 
          src={robotImage} 
          alt="CPU" 
          className="w-20 h-20 rounded-full object-cover border-2 border-secondary" 
        />
        <div className="absolute -bottom-2 -right-2 bg-[#3cc4bf] rounded-full p-2">
          <span className="text-white font-bold">{wins[1]}</span>
        </div>
      </div>
    </div>
  </div>

  

 <div className="flex gap-16 items-center justify-center mt-6">
 

    <div className="flex items-center w-40 h-10 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <div className="bg-primary w-20 h-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">Streak</span>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <span className="text-[#e6f1f5] font-bold text-xl">{streak}</span>
    </div>
  </div>
  <div className="flex items-center w-40 h-10 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    {/* Left Section (Label) */}
    <div className="bg-primary w-20 h-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">Peak</span>
    </div>
    {/* Right Section (Value) */}
    <div className="flex-1 flex items-center justify-center">
      <span className="text-[#e6f1f5] font-bold text-xl">{highscore}</span>
    </div>
  </div>
</div>

</div>


    <div className="flex flex-col items-center justify-center px-5 py-2 rounded-lg shadow-lg">
    <button
  className={`bg-accent text-text p-3 rounded-full mb-5 transition-opacity duration-200 ${winner ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
  onClick={handleWin}
>
  <img src={retry} alt="Retry" className="w-6 h-6" />
</button>        <div className="grid grid-cols-3 gap-4 mb-3">
            {squares.map((value, index) => (
                <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
            ))}
        </div>

        <div className="flex justify-center gap-9">
    <div className="flex flex-col items-center">
        <div
            className={`w-12 h-12 border-8 rounded-full ease-in-out duration-1000 ${winner === 'X' ? 'bg-cool border-primary' : 'bg-bg border-secondary'}`}
        ></div>
        <span className="text-cool mt-2">X</span>
    </div>

    <div className="flex flex-col items-center">
        <div
            className={`w-12 h-12 border-8 rounded-full ease-in-out duration-1000 ${winner === 'O' ? 'bg-cool border-primary' : 'bg-bg border-secondary'}`}
        ></div>
        <span className="text-cool mt-2">O</span>
    </div>


    <div className="flex flex-col items-center">
        <div
            className={`w-12 h-12 border-8 rounded-full ease-in-out duration-1000 ${winner === 'Tie' ? 'bg-cool border-primary' : 'bg-bg border-secondary'}`}
        ></div>
        <span className="text-cool mt-2">Tie</span>
    </div>
</div>

        
    </div>
</div>

    

       
    );
}



    