const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const Message = require('./Message.cjs');
const WorldGeneratorModule = import("./Generators/WorldGenerator.mjs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3000;
let world, runWhenWorldGenerated = [];
WorldGeneratorModule.then((module) => {
    world = module.WorldGenerator.generateWorld();
    runWhenWorldGenerated.forEach((callback) => callback(world));
});

wss.on('connection', (ws) => {
    console.log(`Client connected`);

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

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
