const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const Message = require('./Message.cjs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3000;
wss.on('connection', (ws) => {
    console.log(`Client connected`);

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        const clientMessage = Message.Message.fromString(message);

        let response;
        switch (clientMessage.type) {
            case 'greeting':
                response = new Message.Message('response', `Hello, ${clientMessage.data}!`);
                break;
            // Add other cases as needed
            default:
                response = new Message.Message('error', 'Unknown message type');
                break;
        }

        ws.send(response.toString());
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
