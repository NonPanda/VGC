import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../firebaseConfig";

export default function MazeGame({user}) {
  const [gameStatus, setGameStatus] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [highscore, setHighscore] = useState(99999);

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
              gameId: "5",
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
    if (!hasWon&&gameActive) {
      setGameStatus("You Lose! Try Again.");
      setGameActive(false);
      clearInterval(timerRef.current);
    }
  };

  const handleWin = () => {
    if (gameActive) {
      setGameStatus("You Win! Congratulations!");
      setGameActive(false);
      setHasWon(true);
      clearInterval(timerRef.current);

      if (highscore === null || timer < highscore|| highscore === 0) {
        const saveHighscore = async () => {
          try {
            const response = await axios.post("https://vgc-fcst.onrender.com/api/highscores", {
              userId: userId,
              gameId: "5",
              score: timer,
            });
            setHighscore(timer); 
          } catch (error) {
            console.error("Failed to save highscore:", error);
          }
        };
        saveHighscore();
      }
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex items-center justify-center h-[90vh]">
            <div className="absolute top-24 left-5 flex items-center px-4 py-2 mb-4 gap-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`text-2xl font-bold text-cyan-200`}>
                    {timeformat(timer)}
                  </span>
                </div>
      
      <div className="absolute top-24 right-5 flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-cyan-600/10 to-cyan-500/20 rounded-xl backdrop-blur-sm border border-cyan-500/20 hover:bg-cyan-500/15 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <div className="flex items-center gap-2">
          <span className="text-cyan-200 text-2xl font-medium">Best Time:</span>
          <span className="text-2xl font-bold text-cyan-200">
            {highscore !== null&&highscore!==0 ? timeformat(highscore) : "N/A"}
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="relative w-[500px] h-[500px]">
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
