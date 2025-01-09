import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Ball({ position, onPositionChange, p1, blocks, setBlocks, blockWidth, blockHeight, setTimer,
    setHighscore, highscore, userId, timer
 }) {
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [speed, setSpeed] = useState(2);
    const [victor, setVictor] = useState(false);
    const [start, setStart] = useState(false);


    const checkCollision = (paddlePosition, position) => {
        const paddleCenter = paddlePosition.x + 100;
        const ballCenter = position.x + 20;
        const offset = ballCenter - paddleCenter;
    
        if (
            position.x <= paddlePosition.x + 200 &&
            position.x + 30 >= paddlePosition.x &&
            position.y <= paddlePosition.y + 20 &&
            position.y + 30 >= paddlePosition.y
        ) {
            const normalizedOffset = offset / 100;
            const angle = normalizedOffset * (Math.PI / 4);
            return { collision: true, angle };
        }
        return { collision: false, angle: 0 };
    };
    

    const checkBlockCollision = (position) => {
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (
                position.x + 30 >= block.x &&
                position.x <= block.x + blockWidth &&
                position.y + 30 >= block.y &&
                position.y <= block.y + blockHeight 
            ) {
                setBlocks((prevBlocks) => prevBlocks.filter((_, index) => index !== i));
                if(blocks.length === 1) {

                    setSpeed(0);
                    setVelocity({ x: 0, y: 0 });
                    setVictor('p1');
                    const saveHighscore = async () => {
                        const newScore = timer;
                        console.log('New Score:', newScore);
                        console.log('Highscore:', highscore);
                        console.log('User ID:', userId);
                        console.log('Game ID:', '6');
                        if (newScore < highscore|| highscore === null||highscore===0) {
                            try {
                                const response = await axios.post('http://localhost:5000/api/highscores', {
                            userId,
                            gameId: '6',
                            score: newScore,
                        });
                                console.log('Highscore saved:', response.data);  
                                setHighscore(newScore); 
                            } catch (error) {
                                console.error('Failed to save highscore:', error);
                            }
                        }
                        
                    };
            
                    saveHighscore();

                    return;
                }                   
                const hitFromTop = position.y + 30 - velocity.y * speed <= block.y;
                const hitFromBottom = position.y - velocity.y * speed >= block.y + blockHeight;
                const hitFromLeft = position.x + 30 - velocity.x * speed <= block.x;
                const hitFromRight = position.x - velocity.x * speed >= block.x + blockWidth;

                if (hitFromTop || hitFromBottom) {
                    return { x: velocity.x, y: -velocity.y }; 
                } else if (hitFromLeft || hitFromRight) {
                    return { x: -velocity.x, y: velocity.y };
                }
            }
        }
        return null;
    };

    const moveBall = () => {
        let newX = position.x + velocity.x * speed;
        let newY = position.y + velocity.y * speed;
    
        if (newX < 1 || newX > 1370) {
            setVelocity((prev) => ({ ...prev, x: -prev.x }));
        }
        if (newY < 0) {
            setVelocity((prev) => ({ ...prev, y: -prev.y }));
        }
    
        if (newY > 550) { 
            setVictor("p2");
            return;
        }
    
        const collision = checkCollision(p1, { x: newX, y: newY });
        if (collision.collision) {
            const newSpeed = Math.min(speed + 0.2, 3); 
            const newVelocityX = Math.sin(collision.angle) * newSpeed;
            const newVelocityY = -Math.abs(Math.cos(collision.angle)) * newSpeed; 
            setVelocity({ x: newVelocityX, y: newVelocityY });
            setSpeed(newSpeed);
        }
    
        const newVelocity = checkBlockCollision({ x: newX, y: newY });
        if (newVelocity) {
            setVelocity(newVelocity);
        }
    
        onPositionChange({ x: newX, y: newY });
    };

    const resetBall = () => {

        setStart(true);
        onPositionChange({ x: 650, y: 300 });
        setVelocity({ x: 1, y: 2 });
        setSpeed(2);
        setBlocks(() => {
            const initialBlocks = [];
            for (let row = 0; row < 1; row++) {
                for (let col = 0; col < 1; col++) {
                    initialBlocks.push({ x: col * blockWidth, y: row * blockHeight, id: `${row}-${col}` });
                }
            }
            return initialBlocks;
        });

        setVictor(false);
        setTimer(0);
    };

    useEffect(() => {
        if (start && !victor) { 
            const interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [start, victor, setTimer]);

    useEffect(() => {
        const interval = setInterval(() => {
            moveBall();
        }, 10);
        return () => {
            clearInterval(interval);
        };
    }, [position, velocity, speed, victor, start]);

    return (
        <>
            <div
                className={`absolute w-[30px] h-[30px] bg-white ${!victor && (velocity.x !== 0 || velocity.y !== 0) ? 'shadow-[0_0_6px_rgba(255,255,255,0.5)]' : ''}`} // Updated to w-10 h-10
                style={{
                    left: position.x,
                    top: position.y,
                    boxShadow: !victor && (velocity.x !== 0 || velocity.y !== 0)
                        ? `${velocity.x * -5}px ${velocity.y * -5}px 10px rgba(255, 255, 255, 0.5)`
                        : 'none',
                }}
            />
            {victor && (
                <div className={`mt-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white bg-black p-2.5 rounded ${victor === 'p1' ? 'bg-cool' : 'bg-red-500'}`}>
                    {victor === 'p1' ? 'You win!' : 'You lose! '}
                    <button 
                        onClick={resetBall} 
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl w-36 text-white bg-secondary p-2.5 rounded"
                        style={{ display: 'none' }}
                        ref={(button) => {
                            if (button) {
                                setTimeout(() => {
                                    
                                    button.style.display = 'block';
                                }, 2000);
                            }
                        }}
                    >
                        Try Again?
                    </button>
                </div>

            )}
            {start=='' &&

             (
                <button
                onClick={resetBall}

                 className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl w-36 text-white bg-secondary p-2.5 rounded">
                    Start
                </button>


            )}
        </>
    );
}
