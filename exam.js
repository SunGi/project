const express=require('express');
var app=express();
const router = express.Router();
const db =require('./db/connection');


db.query('insert into exam (number, exam, answer, score) values (?, ?, ?, ?)',[1, "Q. 선린 인터넷고등학교에서 가장 오래된 건물은?",2,100]);
db.query('insert into exam (number, exam, answer, score) values (?, ?, ?, ?)',[2, "Q. 팀로그 6기 부장님의 이름은?",1,200]);
db.query('insert into exam (number, exam, answer, score) values (?, ?, ?, ?)',[3, "Q. 팀로그 로고에 있는 동물은 무엇일까?",3,200]);
db.query('insert into example(number, ex1, ex2, ex3, ex4) values (?, ?, ?, ?, ?)', [1,"1. 1호관","2. 영상교육관","3. 체육관","4. 폴리에스테르 수지 콘크리트 관"]);
db.query('insert into example(number, ex1, ex2, ex3, ex4) values (?, ?, ?, ?, ?)', [2,"1. 장호연","2. 김선기","3. 엄준식","4. 이현빈"]);
db.query('insert into example(number, ex1, ex2, ex3, ex4) values (?, ?, ?, ?, ?)', [3,"1. 너구리","2. 오소리","3. 래서팬더","4. 라쿤"]);


module.exports=router;