import React, { useRef, useState, useEffect } from "react";

export default function MazeGame() {
  const [gameStatus, setGameStatus] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const timeformat = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  const handleStart = () => {
    if (!gameActive) {
      setGameStatus("Game Started! Stay on the path!");
      setGameActive(true);
      setHasWon(false);
      setTimer(0);
      clearInterval(timerRef.current); 
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
  };

  const handleEnd = () => {
    if (!hasWon) {
      setGameStatus("You Lose! Try Again.");
      setGameActive(false);
      clearInterval(timerRef.current);
    }
  };

  const handleWin = () => {
    if (gameActive) {
      setGameStatus("You Win! 🎉");
      setGameActive(false);
      setHasWon(true);
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex items-center justify-center h-[90vh] bg-black">
<div className="absolute top-24 left-5 flex items-center space-x-2 text-white px-3 py-2 rounded-lg shadow-lg">
{gameActive==true&&
<span className="text-3xl font-semibold text-cyan-200 shadow-md px-2 py-1 rounded-lg min-w-[90px] text-center hover:text-cyan-700 transition-colors duration-300 ease-in-out">
  {timeformat(timer)}
</span>
}</div>
      <div className="relative">
        <div className="relative w-[500px] h-[500px] bg-black">
          <div className="wrapper" onMouseLeave={handleEnd}>
            <div className="absolute top-[500px] left-[100px] w-[400px] h-16 bg-cyan-400"></div>
            <div className="absolute top-[400px] left-[444px] w-14 h-28 bg-cyan-400"></div>
            <div className="absolute top-[400px] left-[100px] w-96 h-12 bg-cyan-400"></div>
            <div className="absolute top-[240px] left-[54px] w-12 h-52 bg-cyan-400"></div>
            <div className="absolute top-[192px] left-[54px] w-64 h-12 bg-cyan-400"></div>

            <div className="absolute top-[192px] left-[310px] w-10 h-4 bg-cyan-400"></div>
            <div className="absolute top-[160px] left-[334px] w-4 h-8 bg-cyan-400"></div>
            <div className="absolute top-[160px] left-[280px] w-16 h-4 bg-cyan-400"></div>
            <div className="absolute top-[130px] left-[280px] w-4 h-8 bg-cyan-400"></div>
            <div className="absolute top-[120px] left-[280px] w-10 h-3 bg-cyan-400"></div>
            <div className="absolute top-[100px] left-[308px] w-3 h-5 bg-cyan-400"></div>

            <div
              className="absolute top-[500px] left-[50px] w-16 h-16 bg-green-500"
              onMouseEnter={handleStart}
            ></div>

            <div
              className="absolute top-[36px] left-[280px] w-14 h-16 bg-green-500"
              onMouseEnter={handleWin}
            ></div>
          </div>
        </div>

        <div className="absolute -top-10 w-full text-center text-white text-2xl font-bold">
          {gameStatus}
        </div>
        
      </div>
    </div>
  );
}
