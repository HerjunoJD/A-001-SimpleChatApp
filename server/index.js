const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('Join Room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} has joined ${data}'s room`)
    })

    socket.on('Send Message', (data) => {
        console.log(data);
        socket.to(data.room).emit('Receive Message', data);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    })
});

server.listen(4000, () => {
    console.log("Server is running at Port 4000")
})