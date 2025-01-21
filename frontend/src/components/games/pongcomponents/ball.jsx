import React, { useEffect,useState,useRef} from 'react';



export default function Ball({ position, onPositionChange, p1, p2, scoreChange, setWinner }) {
    
    const[velocity,setVelocity]=useState({x:2,y:2});
    const [speed, setSpeed] = useState(2);
    const [victor,setVictor]=useState(null);

    const checkcollision=(paddleposition,position)=>{
        const paddlecenter=paddleposition.y+50;
        //for left paddle
        if(position.x<=paddleposition.x+20&&position.x>=paddleposition.x&&position.y<=paddleposition.y+100&&position.y>=paddleposition.y)
        {
            const offset=position.y-paddlecenter;
            return {collision:true,offset};
        }
        //for right paddle
            if(position.x+20<=paddleposition.x+20&&position.x+20>=paddleposition.x&&position.y+20<=paddleposition.y+100&&position.y+20>=paddleposition.y)
        {
            const offset=position.y-paddlecenter;
            return {collision:true,offset};
        }
        return {collision:false,offset:0};
    }   


    const moveBall = () => {
        if(victor){
            return;
        }
        let newX=position.x+velocity.x*speed;
        let newY = position.y + velocity.y*speed;
        if (newY < 0 || newY > 480) {
            setVelocity({ ...velocity, y: -velocity.y });
        }
        if (newX < 0) {
            scoreChange((prevScores) => ({ ...prevScores, p2: prevScores.p2 + 1 }));
            resetBall('p2');
            setWinner('p2');
            
            return;


       }
        if (newX > 1280) {
            scoreChange((prevScores) => ({ ...prevScores, p1: prevScores.p1 + 1 }));
            resetBall('p1');
            setWinner('p1');
            return;

        }
        const collisionp1=checkcollision(p1,{x:newX,y:newY});
        if (collisionp1.collision) {
            const angle=collisionp1.offset/50;
            const newvelocity=Math.min(3,angle*speed);
            setVelocity({x: Math.abs(velocity.x),y:newvelocity });
            setSpeed(speed+0.5);

        }
        const collisionp2=checkcollision(p2,{x:newX,y:newY});
        if (collisionp2.collision) {
            const angle=collisionp2.offset/50;
            const newvelocity=Math.min(3,angle*speed);
            setVelocity({x: -Math.abs(velocity.x),y:newvelocity });
            setSpeed(speed+0.1);
        }
        
        onPositionChange({ x: newX, y: newY });

    };

    const resetBall = (victors) => {
        setVictor(victors);
        onPositionChange({ x: 650, y: 200 });
        if(victor==='p1'){

            setVelocity({ x: -2, y: 2 });
        }
        else{
            setVelocity({ x: 2, y: 2 });
        }
        setSpeed(2);
        setTimeout(() => {
            setVictor(null);
        }
            , 1000);
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            moveBall();
        }, 10);
        return () => {
            clearInterval(interval);
        };
    }, [position, velocity,speed,victor]);
    return (
        <>
          <div
    style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        backgroundColor: 'white',
        left: position.x,
        top: position.y,
        boxShadow: !victor && (velocity.x !== 0 || velocity.y !== 0)? `${velocity.x * -5}px ${velocity.y * -5}px 10px rgba(255, 255, 255, 0.5)`: 'none',    }}
/>
        {victor && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '24px',
                        color: 'white',
                        backgroundColor: 'black',
                        padding: '10px',
                        borderRadius: '5px',
                    }}
                >
                    {victor === 'p1' ? 'Player 1 Scores!' : 'Player 2 Scores!'}
                </div>
            )}
        </>

    );
}
