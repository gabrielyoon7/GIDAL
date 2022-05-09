const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const { TestTodo } = require("../models/TestTodo");

router.post('/save', function (req, res) {
    console.log(req.body);
    // 데이터 저장
    var newTodo = new TestTodo(req.body.data);
    newTodo.save(function (error, data) {
        if (error) {
            console.log(error);
            return res.json({ status: 'fail', error })
        } else {
            console.log('Saved!')
            return res.json({ status: 'success' })
        }
    });
});

router.post('/todoSave', function (req, res) {
    TestTodo.updateOne(
        { user_id: req.body.data.user_id },
        {
            $push: {
                to_do_list: {
                    "date": req.body.data.to_do_list.date,
                    "key": req.body.data.to_do_list.key,
                    isDone: false,
                    "value": req.body.data.to_do_list.value,
                }
            }
        }).exec((error, todo) => {
            if (error) {
                console.log(error);
                return res.json({ status: 'error', error })
            } else {
                console.log('Saved!')
                return res.json({ status: 'success' })
            }
        });
});

router.post('/findOwn', function (req, res, next) {
    console.log(req.body.data.user_id);
    // 전체 데이터 가져오기
    TestTodo.find().where('user_id').equals(req.body.data.user_id)
        .then((todos) => {
            // console.log(todos);
            res.json(todos)
        }).catch((err) => {
            console.log(err);
            res.json({ status: 'error', error })
        });
});

router.post('/todoDelete', (req, res) => {
    TestTodo.updateMany(
        { user_id: req.body.data.user_id },
        {
            $pull: {
                to_do_list: {
                    "key": req.body.data.key,
                }
            }
        })
        .exec((error, user) => {
            if (error) {
                console.log(error);
                res.json({ status: 'error', error })
            } else {
                console.log('deleted!')
                res.json({ status: 'success' })
            }
        });
})

router.post('/modifyIsDone', function (req, res, next) {
    TestTodo.updateOne(
        { 'user_id': req.body.data.user_id, 'to_do_list.key': req.body.data.key },
        { $set: {'to_do_list.$.isDone': req.body.data.isDone} }).exec((error, todo) => {
            if (error) {
                console.log(error);
                return res.json({ status: 'error', error })
            } else {
                console.log('modified!')
                return res.json({ status: 'success' })
            }
        });
});

module.exports = router;
