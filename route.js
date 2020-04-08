const express=require('express');
const fs=require('fs');
var server = require('http').Server(app);
var io=require('socket.io')(server);
const db =require('./db/connection');
var app=express();
const router = express.Router();

var flag=0;
var name1;
var mysco;
var num=1;
var numst=0;
var numad=0; // /adquiz
var MaximunUser=0;

router.get('/', (req, res)=>{
    res.render('./html/frontend/page/a/page1.html');   // 홈
});
router.get('/waiting', (req, res)=>{
    res.render('./html/frontend/page/page2/adminfake.html',{ // 리다이렉트 1
        name1:name1
    });
})
router.post('/waiting', (req,res)=>{
    MaximunUser=MaximunUser+1;
    if(req.body.name=='admin'){
        res.render('./html/frontend/page/page2/admin.html',{ // 관리자 대기
            name1:req.body.name
        });
    }
    else{
    res.render('./html/frontend/page/page2/student.html',{ // 학생들 대기
        name1 : req.body.name
    });
}
    name1=req.body.name;
    db.query('insert into manage (name, score) values (?, ?)',[name1, 10]);
    db.query('select * from manage where name=?', [name1],(err, results) =>{   // 이름 점수 db에 저장
        if(err) throw err;
        mysco = results[0].score
        req.session.user={
            name : name1,
            score : mysco
        }
    });
});
router.get('/gamestart', (req,res)=>{
    num=num+1;
    if(numst==3){
        db.query('select * from manage order by score desc', (err, results,fields) =>{                                               /// 랭킹 
            res.render('../finalranking.html',{
                user:results
            });   
        })
    }
    else{
        db.query('select * from exam where number=?', [num-MaximunUser+1],(err, results,fields) =>{                   
            res.render('./html/frontend/page/page3/quizpage.html',{
                num:results
            });   
        })    // 보기만 주기 
    }
});
router.get('/quizgame',(req,res)=>{
    numst=numst+1;
    res.render('./html/frontend/page/page4/quizst.html')
})
router.post('/morewait2',(req,res)=>{                   // 정답 확인 점수 조정
    var ans=req.body.ans;
    db.query('select * from exam where number=?', [numst], (err, results,fields) =>{
        if(ans==results[0].answer){
            mysco=mysco+results[0].score;
            db.query('update manage set score=? where name=?',[mysco, name1]);
        }
        res.redirect('/ranking');
    });
})
router.get('/admingame',(req,res)=>{
    numad=numad+1;
    db.query('select * from exam where number=?', [numad], (err, results,fields) =>{
        db.query('select * from example where number=?',[numad],(errs, result, field)=>{
            res.render('./html/frontend/page/page4/quiz.html',{
                num:results,
                example:result
            });
        })
    })         // 관리자용 4선지 1
});
router.get('/ranking',(req,res)=>{
    db.query('select * from manage order by score desc', (err, results,fields) =>{                                               /// 랭킹 
        res.render('./html/frontend/page/page5/ranking.html',{
            user:results
        });   
    })
});









module.exports=router;



