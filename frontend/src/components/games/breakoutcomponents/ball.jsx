import React, { useEffect, useState } from 'react';

export default function Ball({ position, onPositionChange, p1, blocks, setBlocks, blockWidth, blockHeight }) {
    const [velocity, setVelocity] = useState({ x: 2, y: 2 });
    const [speed, setSpeed] = useState(2);
    const [victor, setVictor] = useState(false);

    const checkCollision = (paddlePosition, position) => {
        const paddleCenter = paddlePosition.x + 50;
        if (
            position.x <= paddlePosition.x + 100 &&
            position.x >= paddlePosition.x &&
            position.y <= paddlePosition.y + 20 &&
            position.y >= paddlePosition.y
        ) {
            const offset = position.x - paddleCenter;
            return { collision: true, offset };
        }
        return { collision: false, offset: 0 };
    };

    const checkBlockCollision = (position) => {
        for (let i = 0; i < blocks.length; i++) {
            const block = blocks[i];
            if (
                position.x + 20 >= block.x && 
                position.x <= block.x + blockWidth &&
                position.y + 20 >= block.y && 
                position.y <= block.y + blockHeight 
            ) {
                setBlocks((prevBlocks) => prevBlocks.filter((_, index) => index !== i));

                const hitFromTop = position.y + 20 - velocity.y * speed <= block.y;
                const hitFromBottom = position.y - velocity.y * speed >= block.y + blockHeight;
                const hitFromLeft = position.x + 20 - velocity.x * speed <= block.x;
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

        if (newX < 0 || newX > 1400) {
            setVelocity({ ...velocity, x: -velocity.x });
        }
        if (newY > 570) {
            resetBall();
            return;
        }
        if (newY < 0) {
            setVelocity({ ...velocity, y: -velocity.y });
        }

        const collision = checkCollision(p1, { x: newX, y: newY });
        if (collision.collision) {
            const angle = collision.offset / 50;
            const newVelocity = Math.min(3, angle * speed);
            setVelocity({ x: newVelocity, y: -Math.abs(velocity.y) });
            setSpeed(Math.min(speed + 0.5), 4);
        }

        const newVelocity = checkBlockCollision({ x: newX, y: newY });
        if (newVelocity) {
            setVelocity(newVelocity);
        }

        onPositionChange({ x: newX, y: newY });
    };

    const resetBall = () => {
        setVictor(true);
        onPositionChange({ x: 650, y: 225 });
        setVelocity({ x: 2, y: 2 });
        setSpeed(2);
        setTimeout(() => {
            setVictor(false);
        }, 1000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            moveBall();
        }, 10);
        return () => {
            clearInterval(interval);
        };
    }, [position, velocity, speed, victor]);

    return (
        <>
            <div
                className={`absolute w-5 h-5 bg-white ${!victor && (velocity.x !== 0 || velocity.y !== 0) ? 'shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}`}
                style={{
                    left: position.x,
                    top: position.y,
                    boxShadow: !victor && (velocity.x !== 0 || velocity.y !== 0)
                        ? `${velocity.x * -5}px ${velocity.y * -5}px 10px rgba(255, 255, 255, 0.5)`
                        : 'none',
                }}
            />
            {victor && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl text-white bg-black p-2.5 rounded">
                    {victor === 'p1' ? 'Player 1 Scores!' : 'Player 2 Scores!'}
                </div>
            )}
        </>
    );
}
