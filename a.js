var express=require('express');
var app=express();
const router = express.Router();
const bodyParser=require("body-parser");
const session=require('express-session');
var server = require('http').Server(app);
var io=require('socket.io')(server);
const route = require('./route');

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

var msg=0;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(route);
app.post('/admingame',(req,res)=>{
    console.log(req.body.asdf);
    if(req.body.asdf=='제출'){
        msg=1;
    }
    res.render('./html/frontend/page/page4/quiz.html');
});
server.listen(3000, console.log('서버가 열림!'));
io.on('connection',(socket)=>{
    console.log('socket에 연결됨');
    io.emit('event_name', msg);
});