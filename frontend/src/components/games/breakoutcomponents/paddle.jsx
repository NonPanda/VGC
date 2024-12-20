import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Paddle({ position, onPositionChange, controls }) {

    const{right,left}=controls;
    const [movingLeft, setMovingLeft] = useState(false);
    const [movingRight, setMovingRight] = useState(false);
    useEffect(() => {
        
        const handleKeyDown = (e) => {
            let newX=position.x;
            const key=e.key.toLowerCase();
            if (key === right) {
                setMovingRight(true);
            }
            if(key === left){
                setMovingLeft(true);
            }
            if(newX!==position.x)


            onPositionChange({...position, x: newX});

        };
        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase();
            if (key === right) {
                setMovingRight(false);
            }
            if(key === left){
                setMovingLeft(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };

    });
    useEffect(()=>{
        const interval=setInterval(()=>{
            let newX=position.x;
            if(movingLeft){
               newX=Math.max(0,position.x-8);
            }
            if(movingRight){
                newX=Math.min(1200,position.x+8);
            }
            if(newX!==position.x)
            onPositionChange({...position,x:newX});
        },5);
       
    return ()=>{
        clearInterval(interval);
    }
    }
    ,[movingLeft,movingRight,position,onPositionChange]);



    return (
        <div
            style={{
                position: 'absolute',
                width: '200px',
                height: '30px',
                backgroundColor: 'white',
                left: position.x,
                top: position.y,
            }}
        />
    );
}


