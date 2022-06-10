const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { DM } = require("../models/DM");

/*유저 업데이트 */
router.post('/userSentDm', function(req, res) {
    // console.log(req.body.data.user_id);
    // let time = new Date().toLocaleTimeString();
    let data = req.body.data
    var newDM = new DM(data);
    newDM.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

// router.post('/userReceivedDm', function(req, res) {
//     console.log(req.body.data.user_id);
//     let time = new Date().toLocaleTimeString();
//     DM.updateOne(
//         { user_id: req.body.data.dmRecipient_id }, 
//         {$push: {receivedDm: {
//             "opponent_id": req.body.data.user_id, 
//             "title": req.body.data.title,
//             "content": req.body.data.content,
//             "date": req.body.data.date,
//             "time": time
//         }}}).exec((error, user)=>{
//             if(error){
//                 console.log(error);
//                 res.json({status: 'error', error})
//             }else{
//                 console.log('Saved!')
//                 res.json({status: 'success'})
//             }
//         });
// });

router.post('/findDM/', function(req, res, next) {
    // 특정 아이디값 가져오기
    const user_id = req.body.data.user_id
    console.log('[로그인 요청] '+user_id);
    DM.find().where('user_id').equals(user_id)
    .then( (users) => {
        console.log(users);
        res.json(users);
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
});

  router.post('/deleteReceivedDM/', function(req, res, next) {
      console.log("re");
    // 삭제
    DM.updateMany(
        { user_id: req.body.data.user_id }, 
        {$pull : {
            receivedDm : {
                "_id": req.body.data.id
            }
        }})
        .exec((error, user)=>{
            if(error){
                console.log(error);
                res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                res.json({status: 'success'})
            }
        });
});

router.post('/deleteSentDM/', function(req, res, next) {
    console.log("sernt");
    // 삭제
    DM.updateMany(
        { user_id: req.body.data.user_id }, 
        {$pull : {
            sentDm : {
                "_id": req.body.data.id
            }
        }})
        .exec((error, user)=>{
            if(error){
                console.log(error);
                res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                res.json({status: 'success'})
            }
        });
});


module.exports = router;
