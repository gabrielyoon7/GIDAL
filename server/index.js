const express = require('express');
const app = express();
const port = 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const diariesRouter = require('./routes/diaries');
const usersRouter = require('./routes/users');
const todoRouter = require('./routes/todo');
const tagsRouter = require('./routes/tags');
const testTodoRouter = require('./routes/TestTodo')
const { Diary } = require("./models/Diary");
const { User } = require("./models/User");
const { UserTodo } = require("./models/UserTodo");
const { Tag } = require("./models/Tag");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

//application/json
app.use(bodyParser.json({limit: "50mb"}));


console.log('  _   __ _____  _   _ ');
console.log(' | | / /|  __ \\| | | |');
console.log(' | |/ / | |  \\/| | | |');
console.log(' |    \\ | | __ | | | |');
console.log(' | |\\  \\| |_\\ \\| |_| |');
console.log(' \\_| \\_/ \\____/ \\___/ ');
console.log('  _____  _      _         _ ');
console.log(' |  __ \\(_)    | |       | |');
console.log(' | |  \\/ _   __| |  __ _ | |');
console.log(' | | __ | | / _` | / _` || |');
console.log(' | |_\\ \\| || (_| || (_| || |');
console.log('  \\____/|_| \\__,_| \\__,_||_|');
console.log();
console.log('Division of Computer Science and Engineering, Kyonggi University');
console.log('컴퓨터공학부 심화캡스톤 기록의 달인 : GIDAL');
console.log('https://github.com/gabrielyoon7/GIDAL');
console.log();


let ip = require("ip");
console.dir('현재 사용중인 내부 ip');
console.dir (ip.address() );
console.log();

mongoose.connect(`mongodb+srv://soyoung:qnstksalcqudfufcjfl@cluster0.c7eeq.mongodb.net/gidal?authSource=admin&replicaSet=atlas-rkqtpg-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, {})
.then(
  () => {
    console.log('MongoDB Connected!! ① http://localhost:5000 ② http://'+ip.address()+':5000');
  }
).catch(
  err => console.log(err)
)

app.get('/', (req, res) => {
    res.send('서버가 동작하고 있습니다.')
  })

app.listen(port, function(){
    console.log('listening on 5000');
});

app.use('/diariesRouter', diariesRouter);
app.use('/usersRouter', usersRouter);
app.use('/todoRouter', todoRouter);
app.use('/tagsRouter', tagsRouter);
app.use('/testTodoRouter', testTodoRouter);