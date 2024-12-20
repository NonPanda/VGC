const games = [
    {
        id: 1,
        name: "Tic Tac Toe",
        price: 59.99,
        image: "../src/assets/tic.png",
        instructionsGif: "../src/assets/tic_instructions.gif", // Add instructions GIF
        instructions: "Tic Tac Toe is a two-player game where players take turns marking spaces in a 3×3 grid with X's and O's. The player who first places three of their marks in a row, column, or diagonal wins the game.",
        controls: [
            "Player 1: X",
            "Player 2: O",
            "Click an empty space to place your mark"
        ]
    },
    {
        id: 2,
        name: "Snake",
        price: 59.99,
        image: "../src/assets/snake.png",
        instructionsGif: "../src/assets/snake_instructions.gif", // Add instructions GIF
        instructions: "Snake is a game where you control a growing snake and try to avoid hitting walls or yourself. Collect food to grow longer and score points.",
        controls: [
            "Arrow keys to move the snake",
            "Avoid hitting walls or the snake's own body"
        ]
    },
    {
        id: 3,
        name: "Pong",
        price: 59.99,
        image: "../src/assets/ping.png",
        instructionsGif: "../src/assets/pong_instructions.gif", // Add instructions GIF
        instructions: "Pong is a classic arcade game where two paddles try to bounce a ball back and forth. Score by getting the ball past your opponent.",
        controls: [
            "Player 1: Use the arrow keys to move the paddle",
            "Player 2: Use W and S keys to move the paddle"
        ]
    },
    {
        id: 4,
        name: "Match Two",
        price: 59.99,
        image: "../src/assets/match.png",
        instructionsGif: "../src/assets/match_instructions.gif", // Add instructions GIF
        instructions: "Match Two is a memory game where you need to find pairs of matching cards. Flip the cards and match them to win.",
        controls: [
            "Click to flip a card",
            "Find matching pairs to win"
        ]
    },
    {
        id: 5,
        name: "Maze",
        price: 59.99,
        image: "../src/assets/maze.png",
        instructionsGif: "../src/assets/maze_instructions.gif", // Add instructions GIF
        instructions: "In Maze, navigate through a labyrinth to find the exit. Avoid obstacles and make your way to the goal.",
        controls: [
            "Arrow keys to move",
            "Reach the exit without hitting walls"
        ]
    },
    {
        id: 6,
        name: "Breakout",
        price: 59.99,
        image: "../src/assets/breakout.png",
        instructionsGif: "../src/assets/breakout_instructions.gif", // Add instructions GIF
        instructions: "Breakout is a game where you control a paddle to bounce a ball and break bricks. Destroy all bricks to win.",
        controls: [
            "Use the arrow keys to move the paddle",
            "Destroy all the bricks with the ball"
        ]
    }
];

export default games;
