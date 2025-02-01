import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';



export default function Paddle({ position, onPositionChange, controls }) {
    const { up, down } = controls;
    const [movingUp, setMovingUp] = useState(false);
    const [movingDown, setMovingDown] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;
            if (up.includes(key)) {
                setMovingUp(true);
            }
            if (down.includes(key)) {
                setMovingDown(true);
            }
        };

        const handleKeyUp = (e) => {
            const key = e.key;
            if (up.includes(key)) {
                setMovingUp(false);
            }
            if (down.includes(key)) {
                setMovingDown(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [up, down]);
    useEffect(()=>{
        const interval=setInterval(()=>{
            let newY=position.y;
            if(movingUp){
               newY=Math.max(0,position.y-8);
            }
            if(movingDown){
                newY=Math.min(400,position.y+8);
            }
            if(newY!==position.y)
            onPositionChange({...position,y:newY});
        },10);
       
    return ()=>{
        clearInterval(interval);
    }
    }
    ,[movingUp,movingDown,position,onPositionChange]);



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


