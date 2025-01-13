import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebaseConfig';



//data set of 8 numbers
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
                    const response = await axios.get('http://localhost:5000/api/highscores', {
                        params: {
                            userId: user.uid,
                            gameId: '4',
                        },
                    });
                    console.log('API Response:', response.data);
    
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
                console.log('New Score:', newScore);
                console.log('Highscore:', highscore);
                console.log('User ID:', userId);
                console.log('Game ID:', '4');
                if (newScore < highscore|| highscore === null||highscore===0) {
                    try {
                        const response = await axios.post('http://localhost:5000/api/highscores', {
                    userId,
                    gameId: '4',
                    score: newScore,
                });
                        console.log('Highscore saved:', response.data);  
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
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="flex items-center justify-center gap-10">
                <h2 className="text-3xl mb-2 font-bold text-text">Tries: {tries}</h2>
                <h2 className="text-3xl mb-2 font-bold text-text">Moves: {moves}</h2>
                <h2 className="text-3xl mb-2 font-bold text-text">Highscore: {highscore !== null ? highscore : 'N/A'}</h2>
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
