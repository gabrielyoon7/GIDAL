const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { User } = require("../models/User");
const bcrypt = require('bcrypt')
// const multer = require('multer')
// const sharp = require("sharp");

/* POST*/
router.post('/save', function(req, res) {
    console.log(req.body);
    const profileImg = "https://cdn-icons-png.flaticon.com/512/1/1247.png"
    // 데이터 저장
    let data = req.body.data
    data.profile_image = profileImg
    var newUser = new User(data);
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

router.post('/webSave', function(req, res) {
    console.log(req.body.data.user_id);
    const profileImg = "https://cdn-icons-png.flaticon.com/512/1/1247.png"
    bcrypt.hash(req.body.data.password, 10, (err, encryptedPassowrd) => {
		// async callback
		const one = {
			user_id: req.body.data.user_id,
			name: req.body.data.name,
            bday: req.body.data.bday,
			gender: req.body.data.gender,
            location: req.body.data.location,
			password: encryptedPassowrd,
            profile_image: profileImg
		};
		const newUser = new User(one);
		newUser.save(function(error, data){
                if(error){
                    console.log(error);
                    return res.json({status: 'fail', error})
                }else{
                    console.log('Saved!')
                    return res.json({status: 'success'})
                }
            })
	});
});

/*유저 업데이트 */
router.post('/userSentDm', function(req, res) {
    console.log(req.body.data.user_id);
    let time = new Date().toLocaleTimeString();
    User.updateOne(
        { user_id: req.body.data.user_id }, 
        {$push: {sentDm: {
            "opponent_id": req.body.data.dmRecipient_id, 
            "title": req.body.data.title,
            "content": req.body.data.content,
            "date": req.body.data.date,
            "time": time
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
    let time = new Date().toLocaleTimeString();
    User.updateOne(
        { user_id: req.body.data.dmRecipient_id }, 
        {$push: {receivedDm: {
            "opponent_id": req.body.data.user_id, 
            "title": req.body.data.title,
            "content": req.body.data.content,
            "date": req.body.data.date,
            "time": time
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
        // console.log(users);
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

router.post('/loginCheck/', function(req, res, next) {
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

router.post('/loginBcrypt/', function(req, res, next) {
    User.findOne({ user_id: req.body.data.user_id }, (err, user) => {
		if (!user) {
			return res.json({
				loginToken: false,
				message: "아이디가 일치하지 않습니다.",
			});
		} else {
			bcrypt.compare(req.body.data.password, user.password, (error, same) => {
				// async callback
                if(!same){
                    console.log(error);
                    return res.json({status: 'fail', error})
                }else{
                    console.log('Saved!')
                    return res.json({status: 'success', user})
                }
			});
		}
	});
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

  router.post('/updateProfile', (req,res) => {
    console.log( req.body.data.user_id);
    User.updateMany(
        { user_id: req.body.data.user_id }, 
        {profile_image: req.body.data.uri}
        )
        .exec((error, user)=>{
            if(error){
                console.log(error);
                res.json({status: 'error', error})
            } else {
                console.log('Saved!')
                // res.json({status: 'success', user:user})
                User.find().where('user_id').equals( req.body.data.user_id )
                    .then((users) => {
                        console.log(users);
                        res.json({status: 'success', user: users})
                    }).catch((err) => {
                        console.log(err);
                        res.json({status: 'error', error})
                    });
            }
        });
  })

  router.post('/deleteReceivedDM/', function(req, res, next) {
      console.log("re");
    // 삭제
    User.updateMany(
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
    User.updateMany(
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

// const formData = new FormData();
// formData.append("selectImg", image);


module.exports = router;
