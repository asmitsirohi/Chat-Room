const http = require('http');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const socketio = require('socket.io');
const formatMessage = require('./src/utils/messages');
const Users = require('./src/utils/users');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

// EJS SPECIFIC STUFF
app.use(expressLayouts);
app.set('views', path.join(__dirname, './src/views'));
app.set('layout', path.join(__dirname, './src/views/layouts', 'layout'));
app.set('view engine', 'ejs');

// SOCKET.IO SPECIFIC STUFF
const botname = 'ChatRoom Bot';
const UsersObj = new Users();

io.on('connection' , socket => {
    socket.on('joinRoom', ({username, rooms}) => {
        const user = UsersObj.joinUser(socket.id, username, rooms);

        socket.join(user.room);

        socket.emit('default', formatMessage(botname, 'Welcome to Chat Room'));        
        socket.broadcast.to(user.room).emit('default', formatMessage(botname, `${user.username} has joined the chat.`));

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: UsersObj.getRoomUsers(user.room)
        });
    });

    socket.on('message', (message) => {
        const user = UsersObj.getUserById(socket.id);

        io.to(user.room).emit('chatMessage', formatMessage(user.username, message)); 
    });

    socket.on('disconnect', () => {
        const user = UsersObj.userLeave(socket.id);

        if(user) {
            io.to(user.room).emit('default', formatMessage(botname, `${user.username} has left the Chat Room`));

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: UsersObj.getRoomUsers(user.room)
            }); 
        }

    });
});



// ROUTER
const dashboardRouter = require('./src/routes/Dashboard');
app.use('/', dashboardRouter);
const roomsRouter = require('./src/routes/Rooms');
app.use('/rooms.ejs', roomsRouter);

const PORT = process.env.PORT || 2000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));