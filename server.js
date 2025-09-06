const express = require('express');
const http = require('http');
const webSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new webSocket.Server({ server });

let players = [];

wss.on("connection", (ws) => {
    console.log("New player connected");
    const playerId = Date.now();
    players[playerId] = { ws, choice: null, name: null };

    ws.send(JSON.stringify({ type: "waiting", message: "Waiting for another player..." }));

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "join") {
            players[playerId].name = data.name;
            console.log(`Player joined: ${data.name}`);
        }

        if (data.type === "choice") {
            players[playerId].choice = data.choice;
            checkGameResult();
        }
    });

    ws.on("close", () => {
        delete players[playerId];
        console.log("Player disconnected");
    });
});

function checkGameResult() {
    const playerIds = Object.keys(players);
    if (playerIds.length === 2) {
        const [player1Id, player2Id] = playerIds;
        const player1 = players[player1Id];
        const player2 = players[player2Id];

        if (player1.choice && player2.choice) {
            let result;

            if (player1.choice === player2.choice) {
                result = "It's a tie!";
            } else if (
                (player1.choice === "rock" && player2.choice === "scissors") ||
                (player1.choice === "scissors" && player2.choice === "paper") ||
                (player1.choice === "paper" && player2.choice === "rock")
            ) {
                result = `${player1.name} wins!`;
            } else {
                result = `${player2.name} wins!`;
            }

            player1.ws.send(JSON.stringify({ type: "result", message: result }));
            player2.ws.send(JSON.stringify({ type: "result", message: result }));

            player1.choice = null;
            player2.choice = null;
        }
    }
}

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
