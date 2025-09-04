const express = require('express');
const http = require('http');
const webSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

let players = [];

wss.on('connection', (ws) => {
    console.log('New player connected');
    const playerId = Date.now();
    players[playerId] = {ws, choice: null};

    ws.send(JSON.stringify({ type: 'waiting', message: 'Waiting for another player...' }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'choice') {
            players[playerId].choice = data.choice;
            checkGameResult();
        }
    });

    ws.on('close', () => {
        delete players[playerId];
        console.log('Player disconnected');
    });
});

function checkGameResult() {
    const playerIds = Object.keys(players);
    if (playerIds.length === 2) {
        const [player1Id, player2Id] = playerIds;
        const player1 = players[player1Id].choice;
        const player2 = players[player2Id].choice;
        if (player1 && player2) {
            let result;
            if (player1 === player2) {
                result = 'It\'s a tie!';
            } else if (
                (player1 === 'rock' && player2 === 'scissors') ||
                (player1 === 'scissors' && player2 === 'paper') ||
                (player1 === 'paper' && player2 === 'rock')
            ) {
                result = 'Player 1 wins!';
            } else {
                result = 'Player 2 wins!';
            }
            players[player1Id].ws.send(JSON.stringify({ type: 'result', message: result }));
            players[player2Id].ws.send(JSON.stringify({ type: 'result', message: result }));

            players[player1Id].choice = null;
            players[player2Id].choice = null;
        }
    }
}

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});