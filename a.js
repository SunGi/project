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


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(route);

server.listen(3000, console.log('서버가 열림!'));
io.on('connection',(socket)=>{
    console.log('socket에 연결됨');
});