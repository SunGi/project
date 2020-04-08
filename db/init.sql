CREATE DATABASE IF NOT EXISTS test;
USE test;


CREATE TABLE  IF NOT EXISTS manage (
    name varchar(32) NOT NULL,
    score int(20)
);
CREATE TABLE IF NOT EXISTS exam(
    number int(5) NOT NULL,
    exam varchar(200),
    answer varchar(200),
    score int(10) 
);
CREATE TABLE IF NOT EXISTS example(
    number int(5) NOT NULL,
    ex1 varchar(30),
    ex2 varchar(30),
    ex3 varchar(30),
    ex4 varchar(30)
);