import React, { useEffect, useState, useRef } from 'react';
import Ball from './pongcomponents/ball';
import Paddle from './pongcomponents/paddle';
import CpuPaddle from './pongcomponents/cpupaddle';
import axios from 'axios';
import robotImage from '../../assets/robot.png';
import { auth } from '../../firebaseConfig';
import './fire.css'



export default function Pong({user}) {
    const canvasWidth = 1300;
    const canvasHeight = 498;
    const [paddle1Position, setPaddle1Position] = useState({ x: 0, y: 200 });
    const [paddle2Position, setPaddle2Position] = useState({ x: 1280, y: 200 });
    const [ballPosition, setBallPosition] = useState({ x: 650, y: 200 });
    const [score, setScore] = useState({ p1: 0, p2: 0 });
    const [streak, setStreak] = useState(0);
    const [userId, setUserId] = useState(null);
    const [winner, setWinner] = useState(null);
    const [highscore, setHighscore] = useState(null);
    const userProfilePicture = user?.photoURL;


        
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
      <div className="relative flex flex-col items-center h-screen">
                        <div className="absolute top-4 right-4 flex items-center gap-3 px-4 h-10 bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 rounded-lg backdrop-blur-sm border border-cyan-500/20 hover:bg-cyan-500/15 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="flex items-center gap-2">
                <span className="text-cyan-200 font-medium text-sm">Peak Streak:</span>
                <span className="text-cyan-200 font-bold text-sm">{highscore}</span>
              </div>
            </div>
    
      {/* Players Section */}
      <div className="flex flex-row items-center justify-center space-x-8">
        {/* User */}
        <div className="relative flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative">
            <img
              src={userProfilePicture}
              alt="User"
              className="w-20 h-20 rounded-full object-cover border-2 border-secondary"
            />
            {/* Fire Effect */}
            <div className={`absolute top-0 left-0 w-10 h-10 flex items-center justify-center  ${streak ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="flame"></div>
              <div className="flame"></div>
              <span className={`absolute text-red-800 font-bold text-xl z-10 animate-pulse  `}>
                {streak}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#3cc4bf] rounded-full p-2">
              <span className="text-white font-bold">{score.p1}</span>
            </div>
          </div>
        </div>
    
        {/* CPU */}
        <div className="relative flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative">
            <img
              src={robotImage}
              alt="CPU"
              className="w-20 h-20 rounded-full object-cover border-2 border-secondary"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#3cc4bf] rounded-full p-2">
              <span className="text-white font-bold">{score.p2}</span>
            </div>
          </div>
        </div>
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
