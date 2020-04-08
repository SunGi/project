var express=require('express');
var app=express();
const router = express.Router();
const bodyParser=require("body-parser");
const session=require('express-session');
const db =require('./db/connection');
var server = require('http').Server(app);
var io=require('socket.io')(server);
const route = require('./route');
const exam =require('./exam');

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));
var num=1;
var msg=0;
var data=1  ;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(route);
app.use(exam);
app.get('/adquiz',(req,res)=>{
    msg=msg+1;
    if(num==4){
        db.query('select * from manage order by score desc', (err, results,fields) =>{                                               /// 랭킹 
            res.render('../finalranking.html',{
                user:results
            });   
        })
    }
    else{
    db.query('select * from exam where number=?', [num], (err, results,fields) =>{                
        res.render('./html/frontend/page/page3/quizpagead.html',{
            num:results,
            cnt:num
        });   
    })
}
    num=num+1;     // 관리자용 보기
});
app.post('/morewait',(req,res)=>{
    msg=1;
    if(msg==1){
        res.redirect('/waiting');
    }
})
app.post('/admingame',(req,res)=>{
    res.render('./html/frontend/page/page4/quiz.html');
});
server.listen(3000, console.log('서버가 열림!'));




io.on('connection',(socket)=>{
    console.log('socket에 연결됨');
    io.emit('event_name', msg);
    io.emit('location', data);
    socket.on('respond',(cnt2)=>{
        console.log(cnt2);
        msg=cnt2+1;
    });
    socket.on('respond2', (cnt)=>{    
        data=cnt;
    });
});