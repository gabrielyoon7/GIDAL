const express = require('express');
const app = express();
const port = 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const  diariesRouter = require('./routes/diaries');
const  usersRouter = require('./routes/users');
const  todoRouter = require('./routes/todo');
const { Diary } = require("./models/Diary");
const { User } = require("./models/User");
const { UserTodo } = require("./models/UserTodo");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

//application/json
app.use(bodyParser.json({limit: "50mb"}));

mongoose.connect(`mongodb+srv://soyoung:qnstksalcqudfufcjfl@cluster0.c7eeq.mongodb.net/gidal?authSource=admin&replicaSet=atlas-rkqtpg-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, {})
.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))

//저장 테스트
// var newDiary = new Diary({user_id:'202212069', date:'2022-04-05', title:'다이어리1', content:'내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용', disclosure:'private'});

// var newTodo = new UserTodo({
//   user_id : "201912067",
// 	to_do_list: [{
//     date: "2022-05-01",
//     contents: [{
//       name: "tototottotododododod"
//     },{
//       name: "tototottotododododo123d"
//     },{
//       name: "tototottotodododo12312334234dod"
//     }]
//   },
//   {
//     date: "2022-04-30",
//     contents: [{
//       name: "tototottotododododod"
//     },{
//       name: "tototottotododododo123d"
//     },{
//       name: "tototottotodododo12312334234dod"
//     }]
//   }]
// });

// newTodo.save(function(error, data){
//   if(error){
//       console.log(error);
//   }else{
//       console.log('Saved!');
//   }
// });

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, function(){
    console.log('listening on 5000');
});

app.use('/diariesRouter', diariesRouter);
app.use('/usersRouter', usersRouter);
app.use('/todoRouter', todoRouter);