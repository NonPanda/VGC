import React, { useState, useEffect, useRef } from 'react';

export default function Snake() {
    const canvasWidth=400;
    const canvasHeight=400;
    const snakeSize = 20;
    const snakeColor = '#3cc4bf';
    const foodColor = '#337480';
    const foodSize = 20;

    const [snake, setSnake] = useState([
        { x: 200, y: 200 },
        { x: 180, y: 200 },
        { x: 160, y: 200 },
        { x: 140, y: 200 },
        { x: 120, y: 200 }
    ]);
    const [food, setFood] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState('RIGHT');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(null);
    const [snakeSpeed, setSnakeSpeed] = useState(100);

    const directionRef = useRef(direction);
    const snakeRef = useRef(snake);
    const foodRef = useRef(food);
    const speedRef = useRef(snakeSpeed);
    
    const createFood = () => {
        let x = Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize;
        let y = Math.floor(Math.random() * (canvasHeight / snakeSize)) * snakeSize;
        setFood({ x, y });
    }; 
    //on page reload create food
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
        let head = { x: newSnake[0].x, y: newSnake[0].y };

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

        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
            newSnake.unshift(head);
            setScore(prevScore => prevScore + 1);
            createFood();
            if(snakeSpeed > 30)
            setSnakeSpeed(prevSpeed => prevSpeed-3);
        
            
        } else {
            newSnake.pop();
            newSnake.unshift(head);
        }

        setSnake(newSnake);
        snakeRef.current = newSnake;
    };

        

    const changeDirection = (e) => {
        const newDirection = (() => {
            switch (e.key) {
                case 'ArrowUp':
                    return directionRef.current !== 'DOWN' ? 'UP' : directionRef.current;
                case 'ArrowDown':
                    return directionRef.current !== 'UP' ? 'DOWN' : directionRef.current;
                case 'ArrowLeft':
                    return directionRef.current !== 'RIGHT' ? 'LEFT' : directionRef.current;
                case 'ArrowRight':
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
            <h2 className="text-4xl mb-4 mt-6 font-bold text-text">Score: {score}</h2>
            <div className={`flex items-center justify-center mb-4 ${gameOver ? '' : 'invisible'}`}>
            <h2 className="text-4xl mb-4 font-bold text-text">Game Over</h2>
            <button className="bg-accent text-text font-bold px-4 py-2 rounded-md ml-4" onClick={() => window.location.reload()}>Restart</button>
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
