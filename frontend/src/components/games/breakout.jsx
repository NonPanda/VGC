import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Paddle from './breakoutcomponents/paddle';
import Ball from './breakoutcomponents/ball';
import Block from './breakoutcomponents/block';

export default function Breakout() {

    const canvasWidth = 1399;
    const canvasHeight = 550;
    const [paddlePosition, setPaddlePosition] = useState({ x: 650, y: 550 });
    const [ballPosition, setBallPosition] = useState({ x: 650, y: 300 });
    const [timer, setTimer] = useState(0);
    const blockWidth = 280;
    const blockHeight = 40;

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
                <Ball position={ballPosition} onPositionChange={setBallPosition} p1={paddlePosition} blocks={blocks} setBlocks={setBlocks} blockWidth={blockWidth} blockHeight={blockHeight}/>
                {blocks.map((block, index) => (
                    <Block key={index} position={block} width={blockWidth} height={blockHeight} />
                ))}
            </div>
        </div>

    );
}