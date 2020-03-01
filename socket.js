const express=require('express');
const app=express();
const server=require('http').createServer(app);
const io=require('socket.io')(server);
var msg='fuck you'

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/test.html');
})

app.get('/asdf',(req,res)=>{
    res.send('hi');
})


io.on('connection', (socket)=>{
    console.log('socket on');
    io.emit('event_name', msg);
})




server.listen(3000, console.log('server is open'));