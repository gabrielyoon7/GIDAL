const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { UserTodo } = require("../models/UserTodo");

router.post('/save', function(req, res) {
    console.log(req.body);
    // 데이터 저장
    var newTodo = new UserTodo(req.body.data);
    newTodo.save(function(error, data){
        if(error){
            console.log(error);
            return res.json({status: 'fail', error})
        }else{
            console.log('Saved!')
            return res.json({status: 'success'})
        }
    });
});

router.post('/todoSave', function(req, res) {
    UserTodo.updateOne(
        { user_id: req.body.data.user_id,
        to_do_list: {
            $elemMatch: {
                "date": req.body.data.date,
            } 
        }}, 
        {$push: { 
                    "to_do_list.$.contents" : {
                            "name": req.body.data.todo,
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

router.post('/newDateTodoSave', function(req, res) {
    UserTodo.updateOne(
        { user_id: req.body.data.user_id}, 
        {$push: { 
                    to_do_list : {
                        date: req.body.data.date,
                        contents: {
                            "name": req.body.data.todo,
                        }
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


router.post('/findOwn', function(req, res, next) {
    // console.log(req.body.data.user_id);
    // 전체 데이터 가져오기
    UserTodo.find().where('user_id').equals(req.body.data.user_id)
    .then( (todos) => {
        // console.log(todos);
        res.json(todos)
    }).catch( (err) => {
        console.log(err);
        res.json({status: 'error', error})
    });
});

router.post('/userTodoDelete', (req,res) => {
    UserTodo.updateOne(
        { user_id: req.body.data.user_id,
        }, 
        {$pull: { 
                    to_do_list :{
                        contents : {
                            "_id": req.body.data._id,
                        }
            }}}).exec((error, todo)=>{
            if(error){
                console.log(error);
                return res.json({status: 'error', error})
            }else{
                console.log('Saved!')
                return res.json({status: 'success'})
            }
        });
  })

module.exports = router;
