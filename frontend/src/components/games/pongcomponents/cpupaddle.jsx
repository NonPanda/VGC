import React, { useEffect, useState } from 'react';

export default function CpuPaddle({ position, onPositionChange, ballPosition,canvasHeight }) {
    const [movingUp, setMovingUp] = useState(false);
    const [movingDown, setMovingDown] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            let newY = position.y;
            if (ballPosition.y < position.y) {
                newY = Math.max(0, position.y - 4);
                setMovingUp(true);
                setMovingDown(false);
            } else if (ballPosition.y > position.y-10) {
                newY = Math.min(canvasHeight - 100, position.y + 4);
                setMovingUp(false);
                setMovingDown(true);
            } else {
                setMovingUp(false);
                setMovingDown(false);
            }
            if (newY !== position.y) {
                onPositionChange({ ...position, y: newY });
            }
        }, 5);

        return () => {
            clearInterval(interval);
        };
    }, [ballPosition, position, onPositionChange]);

    return (
        <div
            style={{
                position: 'absolute',
                width: '20px',
                height: '100px',
                backgroundColor: 'white',
                left: position.x,
                top: position.y,
            }}
        />
    );
}
