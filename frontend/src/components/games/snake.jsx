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
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-36 items-center justify-center py-8 mt-10">
 

    <div className="flex items-center w-40 h-10 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    <div className="bg-primary w-20 h-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">Score</span>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <span className="text-[#e6f1f5] font-bold text-xl">{score}</span>
    </div>
  </div>
  <div className="flex items-center w-40 h-10 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
    {/* Left Section (Label) */}
    <div className="bg-primary w-20 h-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">Highscore</span>
    </div>
    {/* Right Section (Value) */}
    <div className="flex-1 flex items-center justify-center">
      <span className="text-[#e6f1f5] font-bold text-xl">{highscore}</span>
    </div>
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
