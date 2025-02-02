import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebaseConfig';


const numbers=Array.from({ length: 8 }, (v, i) => i + 1);

function Square({ value, onSquareClick }) {
    return (
        <button
            className="w-20 h-20 bg-primary border-2 border-cool text-text font-semibold text-3xl px-0 py-0 transition-all duration-200 ease-in-out hover:border-4"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}
export default function MatchTwo( {user} ) {
    const [board, setBoard] = useState([]);
    const [selected, setSelected] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [tries, setTries] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const[win,setWin]=useState(false);
    const [highscore, setHighscore] = useState(null);
    const [userId, setUserId] = useState(null);



        
        
    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            const fetchHighscore = async () => {
                try {
                    const response = await axios.get('https://vgc-fcst.onrender.com/api/highscores', {
                        params: {
                            userId: user.uid,
                            gameId: '4',
                        },
                    });
    
                    if (response.data && response.data.highscore !== undefined) {
                        setHighscore(response.data.highscore);
                    } else {
                        setHighscore(0);
                    }
                } catch (error) {
                    console.error('Failed to fetch highscore:', error);
                }
            };
            fetchHighscore();
        } else {
            console.warn('User is not logged in!');
        }
    }, [user]);
   
    useEffect(() => {
        const shuffled = numbers.concat(numbers).sort(() => Math.random() - 0.5);
        setBoard(shuffled);
    }, []);

    useEffect(() => {
        if (selected.length === 2) {
            setMoves(moves + 1);
            const [first, second] = selected;
            if (board[first] === board[second]) {
                setMatched([...matched, first, second]);
            }
            else {
                setTries(tries - 1);
            }
            setTimeout(() => {
                setSelected([]);
            }, 1000);
        }
    }, [selected]);

    useEffect(() => {
        if (matched.length === board.length && board.length !== 0) {
            setGameOver(true);
            setWin(true);
    
            const saveHighscore = async () => {
                const newScore = moves;
                if (newScore < highscore|| highscore === null||highscore===0) {
                    try {
                        const response = await axios.post('https://vgc-fcst.onrender.com/api/highscores', {
                    userId,
                    gameId: '4',
                    score: newScore,
                });
                        setHighscore(newScore); 
                    } catch (error) {
                        console.error('Failed to save highscore:', error);
                    }
                }
                
            };
    
            saveHighscore();
        }
    }, [matched, board, moves, highscore]);
    
    useEffect(()=>{
        if(tries===0){
            setGameOver(true);
            
    }
    },[tries]);

    const handleClick = (i) => {
        if(gameOver){
            return;
        }
        if (selected.length === 2 || matched.includes(i)||selected.includes(i)) {
            return;
        }
        setSelected([...selected, i]);
    };

                return (
            <div className="relative flex flex-col items-center h-90vh">
            <div className="absolute top-4 right-4 flex items-center gap-4 px-6 h-12 bg-gradient-to-r from-cyan-500/20 to-cyan-600/10 rounded-lg backdrop-blur-sm border border-cyan-500/20 hover:bg-cyan-500/15 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <div className="flex items-center gap-2">
                <span className="text-cyan-200 font-medium text-xl">Least Moves:</span>
                <span className="text-cyan-200 font-bold text-xl">
                {highscore !== null&&highscore!=0 ? highscore : 'N/A'}
                </span>
            </div>
            </div>
                <div className="mt-6 flex items-center justify-center gap-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <h2 className="text-2xl font-bold text-purple-400 transition-all duration-300">
                Tries: <span>{tries}</span>
                </h2>
            </div>
            
            <div className="w-px h-8 bg-white/10"></div>
            
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h2 className="text-2xl font-bold text-cyan-200 transition-all duration-300">
                Moves: <span>{moves}</span>
                </h2>
            </div>
            </div>
            <div className={`flex items-center justify-center mb-4 transition-opacity duration-700 ${gameOver ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <h2 className="text-3xl mb-4 font-bold text-text">{win ? 'You Win' : 'Game Over'}</h2>
                <button className="bg-accent text-text font-bold px-4 py-2 rounded-md ml-4" onClick={() => window.location.reload()}>Restart</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {board.map((value, i) => (
                    <Square
                        key={i}
                        value={matched.includes(i) || selected.includes(i) ? value : ''}
                        onSquareClick={() => handleClick(i)}
                    />
                ))}
            </div>
        </div>
    );




}
