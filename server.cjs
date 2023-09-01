const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const Message = require('./Message.cjs');
const WorldGeneratorModule = import("./Generators/WorldGenerator.mjs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3000;
let world, runWhenWorldGenerated = [], clients = [], WorldGenerator;
WorldGeneratorModule.then((module) => {
    WorldGenerator = module.WorldGenerator;
    world = WorldGenerator.generateWorld();
    clients.forEach((client) => {
        sendWorldToClient(client, world);
    });
});

function sendWorldToClient(ws, world) {
    ws.send(new Message.Message('worldResponse', world).pack());
}

wss.on('connection', (ws) => {
    const ip = ws._socket.remoteAddress;
    const id = Math.random().toString(36).substr(2, 9);
    console.log(`Client ${ip} / ${id} connected`);
    clients.push({ ws, id });

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        const clientMessage = Message.Message.unpack(message);

        let response;
        switch (clientMessage.type) {
            case 'greeting':
                response = new Message.Message('response', `Hello, ${clientMessage.data}!`);
                break;
            case 'worldRequest':
                if (!world) {
                    response = new Message.Message('error', 'World is not generated yet');
                    runWhenWorldGenerated.push((world) => {
                        response = new Message.Message('worldResponse', world);
                        ws.send(response.pack());
                    });
                    break;
                }
                response = new Message.Message('worldResponse', world);
                break;
            default:
                response = new Message.Message('error', 'Unknown message type');
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

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
    if (key.data === 'r') {
        console.log("Regenerating world...");
        const world = WorldGenerator.generateWorld();
        clients.forEach((client) => {
            sendWorldToClient(client, world);
        });
    }
});