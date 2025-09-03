# Rock Paper Scissors Multiplayer Game

A real-time multiplayer Rock Paper Scissors game built with HTML, CSS, JavaScript for the frontend, and Node.js with Express and WebSockets for the backend.

## Features

- 🎮 Real-time multiplayer gameplay using WebSockets
- 👥 Player matching system
- 📊 Score tracking across multiple rounds
- 🎯 Visual feedback for choices and results
- 🔄 Play again functionality
- 📱 Responsive design

## Technology Stack

### Frontend

- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript

### Backend

- Node.js
- Express.js
- Socket.io (WebSocket library)

## Project Structure

```text
rock-paper-scissors/
├── public/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling for the game
│   └── script.js           # Frontend JavaScript logic
├── server.js               # Node.js/Express server with Socket.io
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## Installation & Setup

1. Clone or download the project files

   ```bash
   # If using git
   git clone <repository-url>
   cd rock-paper-scissors
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the server

   ```bash
   npm start
   ```

4. For development with auto-restart:

   ```bash
   npm run dev
   ```

5. Open your browser
   - Navigate to `http://localhost:3000`

6. Test multiplayer functionality
   - Open another browser window/tab to play against yourself

## How to Play

1. Enter your name and click "Join Game"
2. Wait for the system to match you with another player
3. When a game starts, choose Rock, Paper, or Scissors
4. The game plays best of 3 rounds
5. After completion, you can choose to play again

## Game Rules

- Rock beats Scissors
- Scissors beats Paper
- Paper beats Rock
- Matching choices result in a draw

## API/WebSocket Events

### Client to Server

- `joinGame` - Join the waiting queue
- `makeChoice` - Submit a player's choice
- `playAgain` - Request to play another game
- `cancelWaiting` - Cancel waiting for an opponent

### Server to Client

- `playerCount` - Update on number of connected players
- `waitingForOpponent` - Notification when waiting for match
- `gameStarted` - Notification when game begins
- `roundResult` - Result of each round
- `gameOver` - Final game result
- `playAgain` - Reset game for another round
- `error` - Error notifications

## Dependencies

### Production

- `express`: ^4.18.2 - Web server framework
- `socket.io`: ^4.7.2 - WebSocket library for real-time communication

### Development

- `nodemon`: ^3.0.1 - Utility that automatically restarts node application

## Customization Options

You can modify these aspects of the game:

- Number of rounds: Change the `maxRounds` value in `server.js`
- Styling: Modify colors and styles in `style.css`
- Game rules: Adjust the `rules` object in `server.js`
- Player timeout: Add disconnect handling for inactive players

## Troubleshooting

- **Port already in use**: Change the `PORT` variable in `server.js`
- **Connection issues**: Ensure no firewall is blocking port 3000
- **Game not matching players**: Refresh both browser windows

## Browser Compatibility

This game works on all modern browsers that support:

- ES6 JavaScript features
- CSS Flexbox
- WebSockets

## Future Enhancements

Potential improvements for this game:

- User authentication and profiles
- Game rooms with custom settings
- Chat functionality between players
- Tournament mode with multiple players
- Mobile app version using the same backend

## License

This project is open source and available under the MIT License.