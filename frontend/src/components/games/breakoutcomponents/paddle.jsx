import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


export default function Paddle({ position, onPositionChange, controls }) {

    const{right,left}=controls;
    const [movingLeft, setMovingLeft] = useState(false);
    const [movingRight, setMovingRight] = useState(false);
    useEffect(() => {
        
        const handleKeyDown = (e) => {
            if (left.includes(e.key)) {
                setMovingLeft(true);
            }
            if (right.includes(e.key)) {
                setMovingRight(true);
            }
        };

        const handleKeyUp = (e) => {
            if (left.includes(e.key)) {
                setMovingLeft(false);
            }
            if (right.includes(e.key)) {
                setMovingRight(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        }
    }, [left,right]
    );

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


