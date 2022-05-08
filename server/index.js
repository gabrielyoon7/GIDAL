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

mongoose.connect(`mongodb+srv://soyoung:qnstksalcqudfufcjfl@cluster0.c7eeq.mongodb.net/gidal?authSource=admin&replicaSet=atlas-rkqtpg-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, {})
.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, function(){
    console.log('listening on 5000');
    console.log('http://localhost:5000');
});

app.use('/diariesRouter', diariesRouter);
app.use('/usersRouter', usersRouter);
app.use('/todoRouter', todoRouter);
app.use('/tagsRouter', tagsRouter);
app.use('/testTodoRouter', testTodoRouter);