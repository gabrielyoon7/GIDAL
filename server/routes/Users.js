const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { User } = require("../models/User");

/* POST*/
router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newUser = new User(req.body.data);
    newUser.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

/*유저 업데이트 */
router.post('/userSentDm', function(req, res) {
    console.log(req.body.data.user_id);
    User.updateOne(
        { user_id: req.body.data.user_id }, 
        {$push: {sentDm: {
            "opponent_id": req.body.data.dmRecipient_id, 
            "title": req.body.data.title,
            "content": req.body.data.content,
            "date": req.body.data.date,
        }}}).exec((error, user)=>{
            if(error){
                console.log(error);
                res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                res.json({status: 'success'})
            }
        });
});

router.post('/userReceivedDm', function(req, res) {
    console.log(req.body.data.user_id);
    User.updateOne(
        { user_id: req.body.data.dmRecipient_id }, 
        {$push: {receivedDm: {
            "opponent_id": req.body.data.user_id, 
            "title": req.body.data.title,
            "content": req.body.data.content,
            "date": req.body.data.date,
        }}}).exec((error, user)=>{
            if(error){
                console.log(error);
                res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                res.json({status: 'success'})
            }
        });
});


router.post('/userFollowing', function(req, res) {
    User.updateOne(
        { user_id: req.body.data.user_id }, 
        {$push: {following: {
            "user_id": req.body.data.following_user_id,
            "name": req.body.data.following_user_id,
            "img": req.body.data.img,
        }}}).exec((error, user)=>{
            if(error){
                console.log(error);
                return res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                return res.json({status: 'success'})
            }
        });
});

router.post('/userFollower', function(req, res) {
    User.updateOne(
        { user_id: req.body.data.following_user_id }, 
        {$push: {follower: {
            "user_id": req.body.data.user_id,
            "name": req.body.data.user_id,
            "img": req.body.data.img,
        }}}).exec((error, user)=>{
            if(error){
                console.log(error);
                return res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                return res.json({status: 'success'})
            }
        });
});

router.post('/findOne/', function(req, res, next) {
    // 특정 아이디값 가져오기
    const user_id = req.body.data.user_id
    console.log('[로그인 요청] '+user_id);
    User.find().where('user_id').equals(user_id)
    .then( (users) => {
        console.log(users);
        res.json(users);
    }).catch( (err) => {
        console.log(err);
        next(err)
    });
    // User.findOne({"user_id": bmName}, function(error,news){
    //     console.log('--- Read one ---');
    //     if(error){
    //         console.log(error);
    //     }else{
    //         res.json(news)
            
    //     }
    // });
});

router.post('/userFollowingDelete', (req,res) => {
    console.log( req.body.data.following_user_id);
    User.updateMany(
        { user_id: req.body.data.user_id }, 
        {$pull : {
            following : {
                "user_id": req.body.data.following_user_id
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
  })

  router.post('/userFollowerDelete', (req,res) => {
    console.log( req.body.data.following_user_id);
    User.updateMany(
        { user_id: req.body.data.following_user_id }, 
        {$pull : {
            follower : {
                "user_id": req.body.data.user_id
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
  })

module.exports = router;
