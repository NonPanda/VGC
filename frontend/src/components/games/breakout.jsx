import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Paddle from './breakoutcomponents/paddle';
import Ball from './breakoutcomponents/ball';
import Block from './breakoutcomponents/block';
import { useRef } from 'react';
import {auth} from '../../firebaseConfig';
import axios from 'axios';
export default function Breakout({user}) {


    const [canvasWidth, setCanvasWidth] = useState(0.9*window.innerWidth);
    const [canvasHeight, setCanvasHeight] = useState(0.7*window.innerHeight);
    useEffect(() => {
      const handleResize = () => {
        setCanvasWidth(0.9*window.innerWidth);
        setCanvasHeight(0.7*window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    const [paddlePosition, setPaddlePosition] = useState({ x: canvasWidth / 2 - 70, y: canvasHeight-28 });
    const [ballPosition, setBallPosition] = useState({ x: canvasWidth / 2, y: canvasHeight -100 });
    const [gameStatus, setGameStatus] = useState(null);
    const [timer, setTimer] = useState(0);
    const [userId, setUserId] = useState(null);
    const [highscore, setHighscore] = useState(99999);
    

    const blockWidth = canvasWidth / 5;
    const blockHeight = canvasHeight / 11;
      const timerRef = useRef(null);
      const timeformat = (time) => {
    if (typeof time !== "number" || time < 0) return "N/A";
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
      
  useEffect(() => {
    if (user) {
      setUserId(user.uid);

      const fetchHighscore = async () => {
        try {
          const response = await axios.get("https://vgc-fcst.onrender.com/api/highscores", {
            params: {
              userId: user.uid,
              gameId: "6",
            },
          });

          if (response.data && response.data.highscore !== undefined) {

            setHighscore(response.data.highscore);

          } else {
            setHighscore(null);
          }
        } catch (error) {
          console.error("Failed to fetch highscore:", error);
          setHighscore(null); 
        }
      };

      fetchHighscore();
    }
  }, [user]);


    const rows = 5;
    const columns = 5;
    const BLOCK_COLORS = [
      'bg-primary',
      'bg-accent',
      'bg-cool',
    ];
    
    const [blocks, setBlocks] = useState(() => {
      const initialBlocks = [];
      for (let row = 0; row < rows; row++) {
          for (let col = 0; col < columns; col++) {
              const color = BLOCK_COLORS[(row * columns + col) % BLOCK_COLORS.length];
              initialBlocks.push({ 
                  x: col * blockWidth, 
                  y: row * blockHeight, 
                  id: `${row}-${col}`,
                  color: color 
              });
          }
      }
      return initialBlocks;
  });

      
  if(user===null){
    return (
        <div className="flex flex-col items-center justify-center h-[90%] mt-20">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-bold text-text">Please sign in to play breakout!</h1>
                
            </div>
        </div>
    );
}
    return (
              <div className="flex flex-col items-center p-4 pt-16">
                <div className="absolute top-20 right-4 flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-cyan-600/10 to-cyan-500/20 rounded-xl backdrop-blur-sm border border-cyan-500/20 hover:bg-cyan-500/15 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-200 text-xl">Best Time:</span>
                    <span className="text-xl font-bold text-cyan-200">
                      {highscore !== null&&highscore!=0 ? timeformat(highscore) : "N/A"}
                    </span>
                  </div>
                </div>
              
              
                <div className="absolute top-20 flex items-center px-4 py-2 mb-4 gap-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`text-2xl font-bold ${gameStatus === "Win" ? "text-green-500" : "text-cyan-200"}`}>
                    {timeformat(timer)}
                  </span>
                </div>
                                   
                <div className="relative mt-5">
                  <canvas 
                    width={canvasWidth-5} 
                    height={canvasHeight} 
                    className="bg-gray-950 rounded-lg shadow-lg border-white border-2"
                  />
                  <Paddle 
                    position={paddlePosition} 
                    onPositionChange={setPaddlePosition} 
                    controls={{right: ['d', 'ArrowRight'], left: ['a', 'ArrowLeft']}} 
                    canvasWidth={canvasWidth}
                  />
                  <Ball 
                    position={ballPosition} 
                    onPositionChange={setBallPosition} 
                    p1={paddlePosition} 
                    blocks={blocks} 
                    setBlocks={setBlocks} 
                    blockWidth={blockWidth} 
                    blockHeight={blockHeight} 
                    setTimer={setTimer} 
                    setHighscore={setHighscore} 
                    highscore={highscore} 
                    userId={userId} 
                    gameStatus={gameStatus} 
                    setGameStatus={setGameStatus} 
                    timer={timer}
                    canvasHeight={canvasHeight}
                    canvasWidth={canvasWidth}
                  />
                  {blocks.map((block, index) => (
                    <Block 
                      key={index} 
                      position={block} 
                      width={blockWidth} 
                      height={blockHeight} 
                      color={block.color}
                    />
                  ))}
                </div>
              </div>

    );
}