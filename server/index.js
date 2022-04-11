const express = require('express');
const app = express();
const port = 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const  diariesRouter = require('./routes/diaries');
const  usersRouter = require('./routes/users');
const { Diary } = require("./models/Diary");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

//application/json
app.use(bodyParser.json({limit: "50mb"}));

mongoose.connect(`mongodb://localhost:27017/gidal`, {})
.then(() => console.log('MongoDB Connected!!'))
.catch(err => console.log(err))

//저장 테스트
var newDiary = new Diary({user_id:'202212069', date:'2022-04-05', title:'다이어리1', content:'내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용', disclosure:'private'});

// var newUser = new User({
//   user_id : "testAccount00",
// 			password : "1234",
// 			name : "user_name_00",
// 			gender : "?",
// 			bday : "2022-04-07",
// 			location : "경기도 수원시",
// 			following : [{}],
// 			follower : [{}],
// 			profile_image : "",
// 			points : 10000,
// 			count_diary_total : 0,
// 			count_diary_everyday : 0,
// 			items : {},
// 			sentDm: [{
// 				"dmRecipient_id": 'gidal1',
//         		"title": "test",
// 				"content": "test content",
//         		"date": "2022-04-11"
// 			}]
// });

// newUser.save(function(error, data){
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