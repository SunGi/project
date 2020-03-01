const express=require('express');
const fs=require('fs');
var server = require('http').Server(app);
var io=require('socket.io')(server);
const db =require('./db/connection');
var app=express();
const router = express.Router();

var MaximumUser=0;
var flag=0;
var ConnectUser=0;
var name1;
var mysco;

router.get('/', (req, res)=>{
    res.render('./html/frontend/page/a/page1.html');
});
router.get('/waiting', (req, res)=>{
    res.render('./html/frontend/page/page2/adminfake.html',{
        name1:name1
    });
})
router.post('/waiting', (req,res)=>{
    if(req.body.name=='admin'){
        res.render('./html/frontend/page/page2/admin.html',{
            name1:req.body.name
        });
    }
    else{
    res.render('./html/frontend/page/page2/student.html',{
        name1 : req.body.name
    });
}
    name1=req.body.name;
    db.query('insert into manage (name, score) values (?, ?)',[name1, 10]);
    db.query('select * from manage where name=?', [name1],(err, results) =>{
        if(err) throw err;
        mysco = results[0].score
        req.session.user={
            name : name1,
            score : mysco
        }
        console.log(req.session.user);
    });
    //MaximumUser=MaximumUser+1;
    //console.log('MaximumUser :', MaximumUser); 
});
router.get('/morewait', (req,res)=>{
    res.render('../morewait.html');
   // ConnectUser=ConnectUser+1;
   //console.log('ConnectUser :', ConnectUser);
})
router.get('/gamestart', (req,res)=>{
        res.render('./html/frontend/page/page3/quizpage.html');
});
router.get('/quizgame',(req,res)=>{
    res.render('./html/frontend/page/page4/quizst.html')
})
router.post('/morewait2',(req,res)=>{
    var ans=req.body.ans;
    var ANS=1;
    var score=100;
    res.render('../morewait2.html')
    if(ans==ANS){
        mysco=mysco+score;
        db.query('update manage set score=? where name=?',[mysco, name1]);
    }
    console.log(mysco);
})
router.get('/admingame',(req,res)=>{
    res.render('./html/frontend/page/page4/quiz.html');
});
router.get('/adquiz',(req,res)=>{
    res.render('./html/frontend/page/page3/quizpagead.html');
});
router.get('/ranking',(req,res)=>{
    db.query('select * from manage order by score desc', (err, results,fields) =>{
        console.log(results[0].name);
        res.render('./html/frontend/page/page5/ranking.html',{
            user:results
        });   
    })
});



module.exports=router;