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

module.exports = router;
