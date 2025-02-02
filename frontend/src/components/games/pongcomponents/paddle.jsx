import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';



export default function Paddle({ position, onPositionChange, controls,canvasHeight }) {
    const { up, down } = controls;
    const [movingUp, setMovingUp] = useState(false);
    const [movingDown, setMovingDown] = useState(false);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (up.includes(e.key)) {
                setMovingUp(true);
            }
            if (down.includes(e.key)) {
                setMovingDown(true);
            }
        }
        const handleKeyUp = (e) => {
            if (up.includes(e.key)) {
                setMovingUp(false);
            }
            if (down.includes(e.key)) {
                setMovingDown(false);
            }
        }

        

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
                newY=Math.min(canvasHeight-100,position.y+8);
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


