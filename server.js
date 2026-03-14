// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const userStates = {};

// More varied and intense deep colors for dark mode
const COLORS = [
    '#1e3a8a', // Deep Blue
    '#1e40af', // Blue
    '#3730a3', // Indigo
    '#581c87', // Purple
    '#701a75', // Fuchsia
    '#831843', // Rose
    '#9f1239', // Crimson
    '#7c2d12', // Rust/Orange
    '#78350f', // Amber
    '#365314', // Olive/Lime
    '#064e3b', // Forest Green
    '#065f46', // Emerald
    '#134e4a', // Teal
    '#164e63', // Cyan
    '#0c4a6e'  // Sky Blue
];

const TEXT_COLORS = [
    '#eff6ff', '#eff6ff', '#eef2ff', '#f5f3ff', '#fdf4ff',
    '#fff1f2', '#fff1f2', '#fff7ed', '#fffbeb', '#f7fee7',
    '#ecfdf5', '#ecfdf5', '#f0fdfa', '#ecfeff', '#f0f9ff'
];

let masterItems = {};

io.on('connection', (socket) => {
    console.log('Viewer connected:', socket.id);

    socket.emit('init', { masterItems, userStates });

    socket.on('join', (userData) => {
        userStates[socket.id] = {
            order: userData.order || Object.keys(masterItems),
            name: userData.name || `User ${socket.id.substring(0, 4)}`
        };
        io.emit('userJoined', { 
            userId: socket.id, 
            name: userStates[socket.id].name, 
            order: userStates[socket.id].order 
        });
    });

    socket.on('updateName', (newName) => {
        if (userStates[socket.id]) {
            userStates[socket.id].name = newName;
            io.emit('nameUpdated', { userId: socket.id, name: newName });
        }
    });

    socket.on('updateOrder', (order) => {
        if (userStates[socket.id]) {
            userStates[socket.id].order = order;
            socket.broadcast.emit('stateUpdated', { userId: socket.id, order });
        }
    });

    socket.on('addItem', (item) => {
        const colorIndex = Math.floor(Math.random() * COLORS.length);
        const newItem = {
            id: item.id,
            text: item.text,
            color: COLORS[colorIndex],
            textCol: TEXT_COLORS[colorIndex]
        };
        masterItems[item.id] = newItem;

        for (let userId in userStates) {
            if (!userStates[userId].order.includes(item.id)) {
                userStates[userId].order.push(item.id);
            }
        }
        io.emit('itemAdded', { id: item.id, ...masterItems[item.id] });
    });

    socket.on('editItem', (item) => {
        if (masterItems[item.id]) {
            masterItems[item.id].text = item.text;
            io.emit('itemEdited', { id: item.id, ...masterItems[item.id] });
        }
    });

    socket.on('deleteItem', (itemId) => {
        delete masterItems[itemId];
        for (let userId in userStates) {
            userStates[userId].order = userStates[userId].order.filter(id => id !== itemId);
        }
        io.emit('itemDeleted', itemId);
    });

    // Reset everything for all users
    socket.on('clearAll', () => {
        masterItems = {};
        for (let userId in userStates) {
            userStates[userId].order = [];
        }
        io.emit('clearedAll');
    });

    socket.on('disconnect', () => {
        if (userStates[socket.id]) {
            delete userStates[socket.id];
            io.emit('userDisconnected', socket.id);
        }
    });
});

server.listen(3000, () => {
    console.log('Server is running: Access http://localhost:3000');
});
