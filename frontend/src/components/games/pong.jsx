import React, { useEffect, useState, useRef } from 'react';
import Ball from './pongcomponents/ball';
import Paddle from './pongcomponents/paddle';
import CpuPaddle from './pongcomponents/cpupaddle';
import axios from 'axios';
import robotImage from '../../assets/robot.png';
import { auth } from '../../firebaseConfig';
import './fire.css'



export default function Pong({user}) {
  
    // const canvasWidth= window.innerWidth*0.70;
    // const canvasHeight= window.innerHeight*0.65;
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.70);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.65);
    useEffect(() => {
        const handleResize = () => { 
            setCanvasWidth(window.innerWidth * 0.70);
            setCanvasHeight(window.innerHeight * 0.65);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
      
    const [paddle1Position, setPaddle1Position] = useState({ x: 0, y: canvasHeight / 2 - 50 });
    const [paddle2Position, setPaddle2Position] = useState({ x: canvasWidth - 18, y: canvasHeight / 2 - 50 });
    const [ballPosition, setBallPosition] = useState({ x: canvasWidth / 2, y: canvasHeight / 2 });
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
          const response = await axios.get("https://vgc-fcst.onrender.com/api/highscores", {
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
                        const response = await axios.post('https://vgc-fcst.onrender.com/api/highscores', {
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




if(user===null){
  return (
      <div className="flex flex-col items-center justify-center h-[90%] mt-20">
          <div className="flex flex-col items-center justify-center space-y-4">
              <h1 className="text-4xl font-bold text-text">Please sign in to play pong!</h1>
              
          </div>
      </div>
  );
}
    return (
      <div className="relative flex flex-col items-center h-90vh">
                        <div className="absolute top-4 right-4 flex items-center gap-3 px-4 h-12 bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 rounded-lg backdrop-blur-sm border border-cyan-500/20 hover:bg-cyan-500/15 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="flex items-center gap-2">
                <span className="text-cyan-200 font-medium text-xl">Peak Streak:</span>
                <span className="text-cyan-200 font-bold text-xl">{highscore}</span>
              </div>
            </div>
    
      <div className="flex flex-row items-center justify-center space-x-8">
        <div className="relative flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative">
            <img
              src={userProfilePicture}
              alt="User"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className={`absolute top-0 left-0 w-10 h-10 flex items-center justify-center  ${streak ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="flame"></div>
              <div className="flame"></div>
              <span className={`absolute text-red-800 font-extrabold text-xl z-10 animate-pulse  `}>
                {streak}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 border-2 border-accent">
              <span className="text-white font-bold">{score.p1}</span>
            </div>
          </div>
        </div>
    
        <div className="relative flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative">
            <img
              src={robotImage}
              alt="CPU"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2 border-2 border-accent">
              <span className="text-white font-bold">{score.p2}</span>
            </div>
          </div>
        </div>
      </div>
    

                
            
            <div className="relative">
                <canvas width={canvasWidth} height={canvasHeight} className="border-2 border-white bg-gray-900"></canvas>
                <Paddle position={paddle1Position} onPositionChange={setPaddle1Position}  controls={{up: ['w', 'ArrowUp'],down: ['s', 'ArrowDown']}} canvasHeight={canvasHeight} />
                <CpuPaddle position={paddle2Position} onPositionChange={setPaddle2Position} ballPosition={ballPosition} canvasHeight={canvasHeight} />
                <Ball position={ballPosition} onPositionChange={setBallPosition} p1={paddle1Position} p2={paddle2Position} scoreChange={setScore} setWinner={setWinner} canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
            </div>
        </div>
    );
}
