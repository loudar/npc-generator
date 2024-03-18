import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { Message } from "./Message.mjs";
import { WorldGenerator } from "./Generators/WorldGenerator.mjs";
let world, clients = [];

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const port = process.env.PORT || 3456;
const setProgress = (type, progress) => {
    clients.forEach((client) => {
        client.ws.send(new Message('progress', {
            type,
            progress
        }).pack());
    });
}

function sendWorldToClient(ws, world) {
    ws.send(new Message('worldResponse', world).pack());
}

wss.on('connection', (ws) => {
    const ip = ws._socket.remoteAddress;
    const id = Math.random().toString(36).substr(2, 9);
    console.log(`Client ${ip} / ${id} connected`);
    clients.push({ ws, id });

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        const clientMessage = Message.unpack(message);

        let response;
        switch (clientMessage.type) {
            case 'greeting':
                response = new Message('response', `Hello, ${clientMessage.data}!`);
                break;
            case 'worldRequest':
                if (!world) {
                    response = new Message('error', 'World is not generated yet');
                    break;
                }
                response = new Message('worldResponse', world);
                break;
            case 'generateWorld':
                world = WorldGenerator.generateWorld(setProgress);
                response = new Message('worldResponse', world);
                break;
            default:
                response = new Message('error', 'Unknown message type');
                break;
        }

        ws.send(response.pack());
    });
});
wss.on('close', (ws) => {
    const ip = ws._socket.remoteAddress;
    const id = clients.find((client) => client.ws === ws).id;
    console.log(`Client ${ip} / ${id} disconnected`);
    clients.splice(clients.findIndex((client) => client.ws === ws), 1);
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
