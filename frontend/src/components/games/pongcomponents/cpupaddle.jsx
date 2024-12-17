import React, { useEffect, useState } from 'react';

export default function CpuPaddle({ position, onPositionChange, ballPosition }) {
    const [movingUp, setMovingUp] = useState(false);
    const [movingDown, setMovingDown] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            let newY = position.y;
            if (ballPosition.y < position.y) {
                newY = Math.max(0, position.y - 8);
                setMovingUp(true);
                setMovingDown(false);
            } else if (ballPosition.y > position.y + 100) {
                newY = Math.min(450, position.y + 8);
                setMovingUp(false);
                setMovingDown(true);
            } else {
                setMovingUp(false);
                setMovingDown(false);
            }
            if (newY !== position.y) {
                onPositionChange({ ...position, y: newY });
            }
        }, 10);

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
