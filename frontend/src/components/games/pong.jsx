import React, { useEffect, useState, useRef } from 'react';
import Ball from './pongcomponents/ball';
import Paddle from './pongcomponents/paddle';
import CpuPaddle from './pongcomponents/cpupaddle';
import axios from 'axios';
import { auth } from '../../firebaseConfig';



export default function Pong({user}) {
    const canvasWidth = 1300;
    const canvasHeight = 550;
    const [paddle1Position, setPaddle1Position] = useState({ x: 0, y: 225 });
    const [paddle2Position, setPaddle2Position] = useState({ x: 1280, y: 225 });
    const [ballPosition, setBallPosition] = useState({ x: 650, y: 225 });
    const [score, setScore] = useState({ p1: 0, p2: 0 });
    const [streak, setStreak] = useState(0);
    const [userId, setUserId] = useState(null);
    const [winner, setWinner] = useState(null);
    const [highscore, setHighscore] = useState(null);

        
  useEffect(() => {
    if (user) {
      setUserId(user.uid);

      const fetchHighscore = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/highscores", {
            params: {
              userId: user.uid,
              gameId: "3",
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

  useEffect(() => {
    if (winner === 'p1') {
        console.log('Player 1 wins!');
        setStreak((prevStreak) => {
            const newStreak = prevStreak + 1;  
            if (newStreak > (highscore || 0)) {
                const postHighscore = async () => {
                    try {
                        const response = await axios.post('http://localhost:5000/api/highscores', {
                            userId,
                            gameId: '3',
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
    } else if (winner === 'p2') {
        setStreak(0);
    }
}, [score]);





    return (
        <div className="flex flex-col items-center mt-5 bg-gray-800">
            <div className="text-white mb-4">
                <span>Player 1: {score.p1}</span> - <span>Player 2: {score.p2}</span>
            </div>
            <div className="text-white mb-4">
                <span>Current Streak: {streak}</span>
            </div>
            <div className="text-white mb-4">
                <span>Longest Winning Streak: {highscore}</span>
            </div>
                
            
            <div className="relative">
                <canvas width={canvasWidth} height={canvasHeight} className="border-2 border-white bg-gray-900"></canvas>
                <Paddle position={paddle1Position} onPositionChange={setPaddle1Position} controls={{up:'w', down:'s'}} />
                <CpuPaddle position={paddle2Position} onPositionChange={setPaddle2Position} ballPosition={ballPosition} />
                <Ball position={ballPosition} onPositionChange={setBallPosition} p1={paddle1Position} p2={paddle2Position} scoreChange={setScore} setWinner={setWinner}/>
            </div>
        </div>
    );
}
