import React, { useEffect, useState, useRef } from 'react';
import Ball from './pongcomponents/ball';
import Paddle from './pongcomponents/paddle';
import CpuPaddle from './pongcomponents/cpupaddle';



export default function Pong() {
    const canvasWidth = 1300;
    const canvasHeight = 550;
    const [paddle1Position, setPaddle1Position] = useState({ x: 0, y: 225 });
    const [paddle2Position, setPaddle2Position] = useState({ x: 1280, y: 225 });
    const [ballPosition, setBallPosition] = useState({ x: 650, y: 225 });
    const [score, setScore] = useState({ p1: 0, p2: 0 });

    return (
        <div className="flex flex-col items-center mt-5 bg-gray-800">
            <div className="text-white mb-4">
                <span>Player 1: {score.p1}</span> - <span>Player 2: {score.p2}</span>
            </div>
            <div className="relative">
                <canvas width={canvasWidth} height={canvasHeight} className="border-2 border-white bg-gray-900"></canvas>
                <Paddle position={paddle1Position} onPositionChange={setPaddle1Position} controls={{up:'w', down:'s'}} />
                <CpuPaddle position={paddle2Position} onPositionChange={setPaddle2Position} ballPosition={ballPosition} />
                <Ball position={ballPosition} onPositionChange={setBallPosition} p1={paddle1Position} p2={paddle2Position} scoreChange={setScore}/>
            </div>
        </div>
    );
}
