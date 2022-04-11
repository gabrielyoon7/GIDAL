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
router.post('/userUpdate', function(req, res) {
    User.updateOne(
        { user_id: req.body.data.user_id }, 
        {$push: {sentDm: {
            "dmRecipient_id": req.body.data.dmRecipient_id, 
            "title": req.body.data.title,
            "content": req.body.data.content,
            "date": req.body.data.date,
        }}}).exec();
        (error, user)=>{
            if(error){
                console.log(error);
                res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                res.json({status: 'success'})
            }
        };
});

router.get('/findOne/', function(req, res, next) {
    // 특정 아이디값 가져오기
    const user_id = req.query.user_id;
 
    User.findOne({user_id: user_id}, function(error,users){
        if(error){
            console.log(error);
        }else{
            res.json(users)
        }
    });
});

module.exports = router;
