const express = require("express")
const http = require('http')
const path = require("path");
const groupMessages = require('./models/groupMessageModel')
const { default: mongoose } = require("mongoose")
const app = express()
const socket = require("socket.io")
const {joinChat, getUser, userLeave, getRooms} = require('./models/userModel')

const server = http.createServer(app);

PORT_SERVER = 8000 || process.env.PORT_SERVER
const DB_URL = "mongodb+srv://ffeerdous:Feerdaus12@cluster0.kuvhkkr.mongodb.net/UsersDb?retryWrites=true&w=majority"
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(PORT_SERVER, ()=> {
    console.log("Port server Connected to ", PORT_SERVER)
} )

//http://localhost:8000
app.use(express.static(path.join(__dirname, "template")));
var io = socket(server)

io.on("connection", (socket) => {
    console.log("Client Connection request")
    socket.on("joinRoom", ({ username, room }) => {
        const user = joinChat(socket.id, username, room);

        socket.join(user.room);
        socket.emit('welcome', `Welcome to Chat ${user.firstname}`)
        socket.broadcast.to(user.room).emit("message", groupMessages.formatMessage(`${user.username} has joined the chat`));
        socket.on('message', (data) => {
            const msg = {
                sender: socket.id,
                message: data
            }
           socket.broadcast.emit('message', msg)
        })

    });

    socket.on('join', (roomName) => {
        socket.join(roomName)
        //Send all client 
        const msg = {
            sender: socket.id,
            message: 'Joined the room successfully'
        }
        io.sockets.emit('newMessage', msg)
    })

    socket.on('room_message', (data) => {
        const msg = {
            sender: socket.id,
            message: data.message
        }
        socket.broadcast.to(data.room).emit('newMessage', msg)
    })
    io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRooms(user.room),
      });

      socket.on("chatMessage", (msg) => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit("message", formatMessage(user.username, msg));
      });


   socket.on('disconnect', () => {
        const disconnectedUser = userLeave(socket.id);

        if(disconnectedUser){
            io.to(user.room).emit(
                "message", groupMessages.formatMessage(`${user.username} has left the chat`)
            );
        }
    })
})