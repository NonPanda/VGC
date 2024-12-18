import React, { useRef, useState, useEffect } from "react";

export default function MazeGame() {
  const [gameStatus, setGameStatus] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [hasWon, setHasWon] = useState(false); 

  const handleStart = () => {
    setGameStatus("Game Started! Stay on the path!");
    setGameActive(true);
    setHasWon(false);
  };

  const handleEnd = () => {
    if (!hasWon) {
      setGameStatus("You Lose! 😢 Try Again.");
      setGameActive(false);
    }
  };

  const handleWin = () => {
    if (gameActive) {
      setGameStatus("You Win! 🎉");
      setGameActive(false);
      setHasWon(true);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative">
        <div
          className="relative w-[500px] h-[500px] bg-black"
        >
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


        <div className="absolute -top-20 w-full text-center text-white text-2xl font-bold">
          {gameStatus}
        </div>
      </div>
    </div>
  );
}





