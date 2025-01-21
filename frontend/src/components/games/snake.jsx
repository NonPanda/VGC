import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import retry from '../../assets/retry.svg';


export default function Snake({user}) {
    const canvasWidth=400;
    const canvasHeight=400;
    const snakeSize = 20;
    const snakeColor = '#3cc4bf';
    const foodColor = '#337480';
    const foodSize = 20;

    const [snake, setSnake]=useState([{x:200, y:200 },{x:180, y:200 },{x:160, y:200 },{x:140, y:200 },{x:120, y:200 }]);
    const [food, setFood]=useState({x:0,y:0});
    const [direction, setDirection]=useState('RIGHT');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(null);
    const [snakeSpeed, setSnakeSpeed] = useState(100);
    const [highscore, setHighscore] = useState(0);
    const [userId, setUserId] = useState(null);


    const directionRef = useRef(direction);
    const snakeRef = useRef(snake);
    const foodRef = useRef(food);
    const speedRef = useRef(snakeSpeed);
    useEffect(() => {
        if (user) {
          setUserId(user.uid);
    
          const fetchHighscore = async () => {
            try {
              const response = await axios.get("http://localhost:5000/api/highscores", {
                params: {
                  userId: user.uid,
                  gameId: "2",
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

    const createFood = () => {
        let x = Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize;
        let y = Math.floor(Math.random() * (canvasHeight / snakeSize)) * snakeSize;
        setFood({ x, y });
    }; 
    useEffect(() => {
        createFood();
    }, []);

    const initGame = () => {
    if(gameOver==null){
    setGameOver(false);
    }
};


        

    useEffect(() => {
        foodRef.current = food;
        speedRef.current = snakeSpeed;

    }, [food, snakeSpeed]);
    
    const move = () => {
        if(gameOver==null){
            return;
        }
        let newSnake = [...snakeRef.current];
        let head = {x:newSnake[0].x, y:newSnake[0].y };

        if (directionRef.current === 'RIGHT') {
            head.x += snakeSize;
        } else if (directionRef.current === 'LEFT') {
            head.x -= snakeSize;
        } else if (directionRef.current === 'UP') {
            head.y -= snakeSize;
        } else if (directionRef.current === 'DOWN') {
            head.y += snakeSize;
        }

        if (
            head.x < 0 ||
            head.x >= canvasWidth ||
            head.y < 0 ||
            head.y >= canvasHeight ||
            newSnake.slice(1).some(s => s.x === head.x && s.y === head.y)
        ) {

            setGameOver(true);
            
            return;
        }

        if (head.x===foodRef.current.x&&head.y===foodRef.current.y){
            newSnake.unshift(head);
            const score1=score+1;
            setScore(score1);
        
            if (score1>highscore){
                setHighscore(score1);
        
                const postHighscore=async()=>{
                    try{
                        const response=await axios.post('http://localhost:5000/api/highscores',{
                            userId,
                            gameId:'2',
                            score:score1,
                        });
                        console.log('Highscore Updated:',score1);
                    }catch(error){
                        console.error('Failed to update highscore:',error);
                    }
                };
                postHighscore();
            }
        
            createFood();
            if (snakeSpeed>30)setSnakeSpeed(prevSpeed=>prevSpeed-3);
        }else{
            newSnake.pop();
            newSnake.unshift(head);
        }
        

        setSnake(newSnake);
        snakeRef.current = newSnake;
    };

        

    const changeDirection = (e) => {
        
        const newDirection = (() => {
            if(gameOver==null){
                initGame();
            }
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    return directionRef.current !== 'DOWN' ? 'UP' : directionRef.current;
                case 'ArrowDown':
                case 's':
                case 'S':
                    return directionRef.current !== 'UP' ? 'DOWN' : directionRef.current;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    return directionRef.current !== 'RIGHT' ? 'LEFT' : directionRef.current;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    return directionRef.current !== 'LEFT' ? 'RIGHT' : directionRef.current;
                default:
                    return directionRef.current;
            }
        })();
    
        setDirection(newDirection);
        directionRef.current = newDirection;
    };
    

    
    useEffect(() => {
        const interval = setInterval(() => {
            if(!gameOver){
                move();
            }
            else {
                clearInterval(interval);
            }
        }, speedRef.current);
        
        document.addEventListener('keydown', changeDirection);
        
        return () => {
            clearInterval(interval);
            document.removeEventListener('keydown', changeDirection);
        };
        
    }, [snakeSpeed,gameOver]);

    

    return (
        <div className="relative flex flex-col items-center h-screen">
        <div className="absolute top-4 right-4 flex items-center gap-4 px-6 h-10 bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 rounded-lg backdrop-blur-sm border border-cyan-500/20 hover:bg-cyan-500/15 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <div className="flex items-center gap-2">
            <span className="text-cyan-200 font-medium text-sm">Highscore:</span>
            <span className="text-cyan-200 font-bold text-sm">
              {highscore !== null ? highscore : 'N/A'}
            </span>
          </div>
        </div>
            <div className="mt-8 mb-4 flex items-center justify-center gap-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
          
          
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-2xl font-bold text-cyan-200 transition-all duration-300">
              Score: <span>{score}</span>
            </h2>
          </div>
        </div>
            <div className={`flex items-center justify-center mb-8 ${gameOver ? '' : 'invisible'}`}>
            <button className="bg-accent text-text font-bold px-4 py-2 rounded-md ml-4" onClick={() => window.location.reload()}>  <img src={retry} alt="Retry" className="w-6 h-6" />
            </button>
            </div>
            
            <canvas
                className="border-accent border-8 rounded-md"
                width={canvasWidth}
                height={canvasHeight}
                ref={canvas => {
                    if (canvas) {
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                        ctx.fillStyle = snakeColor;
                        snake.forEach(s => {
                            ctx.fillRect(s.x, s.y, snakeSize, snakeSize);
                        });
                        ctx.fillStyle = foodColor;
                        ctx.fillRect(food.x, food.y, foodSize, foodSize);                        
                    }
                }}
                onClick={initGame}
            ></canvas>
        </div>
    );
}
