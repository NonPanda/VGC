import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Paddle from './breakoutcomponents/paddle';
import Ball from './breakoutcomponents/ball';
import Block from './breakoutcomponents/block';
import { useRef } from 'react';

export default function Breakout() {

    const canvasWidth = 1399;
    const canvasHeight = 550;
    const [paddlePosition, setPaddlePosition] = useState({ x: 600, y: 550 });
    const [ballPosition, setBallPosition] = useState({ x: 685, y: 300 });
    const [gameStatus, setGameStatus] = useState(null);
    const [timer, setTimer] = useState(0);
    const blockWidth = 280;
    const blockHeight = 40;
      const timerRef = useRef(null);
      const timeformat = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      }
      

    const rows = 7;
    const columns = 5;
    const [blocks, setBlocks] = useState(() => {
        const initialBlocks = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
            initialBlocks.push({ x: col * blockWidth, y: row * blockHeight, id: `${row}-${col}` });
            }
        }
        return initialBlocks;
        });

    return (
        
        <div className="flex flex-col items-center mt-5 bg-gray-800">
            <div className="relative">
                <canvas width={canvasWidth} height={canvasHeight} className=" bg-gray-900"></canvas>
                <Paddle position={paddlePosition} onPositionChange={setPaddlePosition} controls={{right:'d', left:'a'}} />
                <Ball position={ballPosition} onPositionChange={setBallPosition} p1={paddlePosition} blocks={blocks} setBlocks={setBlocks} blockWidth={blockWidth} blockHeight={blockHeight} 
                 setTimer={setTimer}

                />
                {blocks.map((block, index) => (
                    <Block key={index} position={block} width={blockWidth} height={blockHeight} />
                ))}
            </div>
            <span className={`mt-10 text-3xl font-semibold text-cyan-200 shadow-md px-2 py-1 rounded-lg min-w-[90px] text-center hover:text-cyan-700 transition-colors duration-300 ease-in-out ${gameStatus === "Win" ? "text-green-500" :""}`}
             >
    {timeformat(timer)}
    </span>
        </div>

    );
}