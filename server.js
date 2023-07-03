const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
      
        socket.on('send_message',(data)=>{
          console.log("received message in server side",data)
          io.emit('received_message',data)
        })
      
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
        
      });
      
      server.listen(port, () => {
        console.log( `Server running at http://192.168.1.5:${port}/`);
      });